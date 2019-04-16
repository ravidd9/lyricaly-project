class ApiManager {
    constructor() {
        this.songData = []

    }

    async getDataFromDB() {
        let songs = await $.get('/songs')
        this.songData.push(songs)
    }

    async getSongID(query) {
        let id = await $.get(`/songID/${query}`)
        getSongData(id)
    }

    async getSongData(id) {
        let song = await $.get(`/song/${id}`)
        this.songData.push(song)
        console.log(this.songData)
    }


    saveSong(songID) {
        let chosenSong
        for (let song of this.songData) {
            if (song.id == songID) {
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