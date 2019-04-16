class ApiManager {
    constructor() {
        this.songData = {}
    }

    async getDataFromDB() {
        let songs = await $.get('/songs')
        this.songData.push(songs)
    }
    
    async getSongID(query) {
        let id = await $.get(`/songID/${query}`)
        await this.getSongData(parseInt(id))
    }

    async getSongData(id) {
        let song = await $.get(`/song/${id}`)
        this.songData = song
    }

    async saveSong(songID) {
        await $.post(`/song`, this.songData, function (song) {
            console.log("song sent!")
        })
    }

    async removeSong(songID) {
        await $.ajax({
            url: `/city/${songID}`,
            type: 'DELETE',
            success: function () {

                console.log("song deleting!")
            }
        })
        for (let i in this.songData){
            if(this.songData[i].id == songID){
                this.songData.splice(i, 1)
            }
        }
    }
}