class ApiManager {
    constructor() {
        this.songData = {}
        this.favorites = []
        this.others = []
        this.ids = []
    }

    async getDataFromDB() {
        this.favorites = await $.get('/songs')
        // for (let i in this.favorites) {
        //     if (this.favorites[i].id == this.songData.id) {
        //         // this.favorites[i].viewed = true
        //         this.favorites.splice(i, 1)
        //     }
        // }
    }

    async getSongID(query) {
        this.ids = await $.get(`/songID/${query}`)
        await this.getSongData(this.ids[0])
    }

    async getSongData(id) {
        this.songData = await $.get(`/song/${id}`)
        this.others = []
        for (let i in this.ids) {
            this.others.push(await $.get(`/song/${this.ids[i]}`))
        }
    }

    async saveSong(songID) {
        let song = await $.post(`/song`, this.songData)
        this.favorites.push(song)
    }

    async removeSong(songID) {
        await $.ajax({
            url: `/song/${songID}`,
            type: 'DELETE',
            success: function () {
                console.log("song deleting!")
            }
        })
        for (let i in this.favorites) {
            if (this.favorites[i].id == songID) {
                this.favorites.splice(i ,1)
            }
        }
    }
}