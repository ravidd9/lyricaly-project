class ApiManager {
    constructor() {
        this.songData = {}
        this.favorites = []
        this.others = []
        this.ids = []
    }

    async getDataFromDB() {
        let songs = await $.get('/songs')
        this.favorites = songs
        for(let i in this.favorites){
            if(this.favorites[i].id == this.songData.id){
                // this.favorites[i].viewed = true
                this.favorites.splice(i, 1)
            }
        }
    }
    
    async getSongID(query) {
        this.ids = await $.get(`/songID/${query}`)
        await this.getSongData(this.ids[0])
    }

    async getSongData(id) {
        this.songData = await $.get(`/song/${id}`)
        for(let i in this.ids){
            this.others.push(await $.get(`/song/${this.ids[i]}`))
        }
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