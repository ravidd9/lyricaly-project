const express = require('express')
const router = express.Router()
const request = require('request')
const mongoose = require('mongoose')
const Lyricist = require('lyricist/node6')
const lyricist = new Lyricist("S7f0dtwOvhwZCQ068G8dczrKGQ690xClGr03ZaOYpoFeZ0-FCte_7e1IlV1wAl02")
const Song = require('../models/Song')
// const apiURL = "https://api.musixmatch.com/ws/1.1/"
// const apiKey = "886760bc9aa2065b0c94616d40580526"
const apiURL = "https://api.genius.com"
const clientID = "9et69XWfark8Dr2XVjaSXhfMZvhffAhtEc8ItGVKb24H3zExHMOREOsLstWyFBEU"
const clientS = "ZxEYCaruoE8ffRSmF8XjgGGxNuirRDV7n547saR1I8nTnw55-S96WKDZf_noiO5kDEIgJFxBGi1FdIFFKVLr6A"
const clientT = "S7f0dtwOvhwZCQ068G8dczrKGQ690xClGr03ZaOYpoFeZ0-FCte_7e1IlV1wAl02"


const createSong = function (name, id, artist, lyrics, songPic) {
    let s1 = new Song({name, id, artist, lyrics, songPic})
    return s1
}

const getLyrics = async function(id){
    let song = await lyricist.song(id, {fetchLyrics: true})
    return song.lyrics
}

router.get(`/song/:songQuery`, function (req, res) {
    let songQ = req.params.songQuery
    if (songQ) {
        request(`${apiURL}/search?client_id=${clientID}&client_secret=${clientS}
        &access_token=${clientT}&q=${songQ}`, async function (err, result) {
            let body = JSON.parse(result.body)
            let name = body.response.hits[0].result.title
            let id = body.response.hits[0].result.id
            let artist = body.response.hits[0].result.primary_artist.name
            let songPic = body.response.hits[0].result.header_image_thumbnail_url
            let lyrics = await getLyrics(id)
            let newSong = createSong(name, id, artist, lyrics, songPic)
            res.send(newSong)
        })
    }
})


//musixmatch
// const getLyrics = function (id) {
//     request(`${apiURL}/track.lyrics.get?apikey=${apiKey}&track_id=${id}`, function (err2, result2) {
//         let body2 = JSON.parse(result2.body)
//         // console.log(body2)
//         let lyrics = body2.message.body.lyrics.lyrics_body
//         return lyrics
//     })
// }
// router.get(`/song/:songName/:artist`, function (req, res) {
//     let nameQ = req.params.songName
//     let artistQ = req.params.artist
//     if (nameQ) {
//         request(`${apiURL}/track.search?apikey=${apiKey}&q_track=${nameQ}&q_artist=${artistQ}`, function (err1, result1) {
//             let body1 = JSON.parse(result1.body)
//             let name = body1.message.body.track_list[0].track.track_name
//             let id = body1.message.body.track_list[0].track.track_id
//             let albumName = body1.message.body.track_list[0].track.album_name
//             let albumId = body1.message.body.track_list[0].track.album_id
//             let artist = body1.message.body.track_list[0].track.artist_name
//             let lyrics = getLyrics(id)
//             let newSong = createSong(name, id, albumName, albumId, artist, lyrics)
//             res.send(newSong)
//         })
//     }
// })

router.get(`/songs`, function (req, res) {
    Song.find({}).exec((err, songs) => {
        res.send(songs)
    })
})

router.post(`/song`, function (req, res) {
    let body = req.body
    let song = new Song(body)
    song.save()
})

router.delete(`/song/:songId`, function (req, res) {
    let songId = req.params.songId
    Song.findOneAndDelete({
        id: songId
    }, () => {})
})





module.exports = router