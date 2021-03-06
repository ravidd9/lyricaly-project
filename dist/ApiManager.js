class ApiManager {
    constructor() {
        this.songData = {
        
            // name: "Chandelier",
            // id: 378195,
            // artist: "Sia",
            // artistID: 16775,
            // titleFeatured: "Chandelier",
            // album: "1000 Forms of Fear",
            // albumID: 104614,
            // lyrics: "adad",
            // songPic: "https://images.genius.com/5bcfb76690b3fb068a317c76579b70b5.300x300x1.jpg",
            // applePlayer: "https://genius.com/songs/378195/apple_music_player",
            // youTubePlayer: "http://www.youtube.com/embed/2vjPBrBU-TM"
        }
        this.favorites = []
        this.others = []
        this.ids = []
        this.history = []
    }

    async getDataFromDB() {
        this.favorites = await $.get('/songs')
    }

    async getAutoCompleteFromDB() {
        this.history = await $.get('/complete')
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
        for(let fav of this.favorites){
            if(fav.id == songID){
                return;
            }
        }
        let song = await $.post(`/song`, this.songData)
        this.favorites.push(song)
    }

    async addAutoComplete (query) {
        
        for (let item of this.history) {
            if (query == item) {
                return
            }
        }
        let aC = await $.post (`/complete/${query}`)
        this.history.push(aC.text)
        
        
        
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