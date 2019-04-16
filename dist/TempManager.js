class TempManager {
    constructor() {
        this.songData = []

    }

    async getDataFromDB() {
        let songs = await $.get('/songs')
        this.songData.push(songs)
    }

    async getSongData(searchObj) {

        await $.get(`/song/${searchObj.song}/artist/${searchObj.artist}`, function (data) {
            console.log(data)
            let retrievedSong = {
                songName: searchObj.song,
                artistName : searchObj.artist,
                lyrics : "",
                pic : ""

             }
            tempManager.songData.push(retrievedSong)
            console.log(tempManager.songData)
        })
    }


    saveSong() {

    }

    removeSong() {

    }
}