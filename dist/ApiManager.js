class ApiManager {
    constructor() {
        this.songData = []

    }

    async getDataFromDB() {
        let songs = await $.get('/songs')
        this.songData.push(songs)
    }

    async getSongData(query) {
        let song = await $.get(`/song/${query}`)
        this.songData.push(song)
        console.log(this.songData)
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