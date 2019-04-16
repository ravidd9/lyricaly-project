let apiManager = new ApiManager ()
let renderer = new Renderer ()

let searchObj = {
    song : "", 
    artist : ""
}

const songSearch = async function(){
    let songName = $("#songSearch").find("input").val()
    searchObj.song = songName
    console.log(searchObj)
      
}

const artistSearch = async function(){
    let artistName = $("#artistSearch").find("input").val()
    searchObj.artist = artistName
    console.log(searchObj)
    await apiManager.getSongData(searchObj)
    renderer.render(apiManager.songData)
    
}
