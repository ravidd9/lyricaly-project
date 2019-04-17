const express = require('express')
const router = express.Router()
const request = require('request')
const mongoose = require('mongoose')
const Song = require('../models/Song')
const apiURL = "https://api.genius.com"
const clientID = "9et69XWfark8Dr2XVjaSXhfMZvhffAhtEc8ItGVKb24H3zExHMOREOsLstWyFBEU"
const clientS = "ZxEYCaruoE8ffRSmF8XjgGGxNuirRDV7n547saR1I8nTnw55-S96WKDZf_noiO5kDEIgJFxBGi1FdIFFKVLr6A"
const clientT = "S7f0dtwOvhwZCQ068G8dczrKGQ690xClGr03ZaOYpoFeZ0-FCte_7e1IlV1wAl02"
const Lyricist = require('lyricist/node6')
const lyricist = new Lyricist(clientT)


const createSong = function (name, id, artist, artistID, titleFeatured,
    album, albumID, lyrics, songPic, applePlayer, youTubePlayer) {
    let s1 = new Song({
        name,
        id,
        artist,
        artistID,
        titleFeatured,
        album,
        albumID,
        lyrics,
        songPic,
        applePlayer,
        youTubePlayer
    })
    return s1
}

const getLyrics = async function (id) {
    let song = await lyricist.song(id, {
        fetchLyrics: true
    })
    return song.lyrics
}
const getAlbum = async function (albumID) {
    let album = await lyricist.album(albumID, {
        fetchTracklist: true
    });
    return album.songs
}

router.get(`/songID/:songQuery`, function (req, res) {
    let songQ = req.params.songQuery
    if (songQ) {
        request(`${apiURL}/search?client_id=${clientID}&client_secret=${clientS}
        &access_token=${clientT}&q=${songQ}`, async function (err, result) {
            let body = JSON.parse(result.body)
            let ids = []
            for (let hit of body.response.hits) {
                ids.push(hit.result.id)
            }
            res.send(ids)
        })
    }
})
router.get(`/song/:id`, function (req, res) {
    let id = req.params.id
    if (id) {
        request(`${apiURL}/songs/${id}?client_id=${clientID}&client_secret=${clientS}
        &access_token=${clientT}`, async function (err, result) {
            let body = JSON.parse(result.body)
            let name = body.response.song.title
            let artist = body.response.song.primary_artist.name
            let artistID = body.response.song.primary_artist.id
            let titleFeatured = body.response.song.title_with_featured
            let album
            let albumID
            if (body.response.song.album) {
                album = body.response.song.album.name
                albumID = body.response.song.album.id
            }
            else{
                album = ""
                albumID = ""
            }
            let lyrics = await getLyrics(id)
            let songPic = body.response.song.header_image_thumbnail_url
            let applePlayer = body.response.song.apple_music_player_url
            let youTubePlayer = body.response.song.media[0].url
            let newSong = createSong(name, id, artist, artistID, titleFeatured,
                album, albumID, lyrics, songPic, applePlayer, youTubePlayer)
            res.send(newSong)
        })
    }
})


router.get(`/songs`, function (req, res) {
    Song.find({}).exec((err, songs) => {
        res.send(songs)
    })
})

router.post(`/song`, function (req, res) {
    let body = req.body
    let song = new Song(body)
    song.save()
    res.send(song)
})

router.delete(`/song/:songId`, function (req, res) {
    let songId = req.params.songId
    Song.findOneAndDelete({
        id: songId
    }, () => {})
})





module.exports = router