class ApiManager {
    constructor() {
        this.songData = []

    }

    async getDataFromDB() {
        let songs = await $.get('/songs')
        this.songData.push(songs)
    }

    async getSongData(searchObj) {

        await $.get(`/song/${searchObj.song}/artist/${searchObj.artist}`, function (song) {
            console.log(data)
            let retrievedSong = {
                songName: searchObj.song,
                artistName : artistName,
                lyrics : song.lyrics,
                pic : song.songPic

             }
            this.songData.push(retrievedSong)
            console.log(this.songData)
        })
    }


    saveSong(songName) {
        let chosenSong
        for (let song of this.songData) {
            if (song.name == songName) {
                chosenSong = song
            }
        }
        $.post(`/song`, chosenSong, function (song) {
            console.log("song sent!")
        })
    }

    removeSong() {

    }
}