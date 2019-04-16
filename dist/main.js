let tempManager = new TempManager
let renderer = new Renderer

let searchObj = {
    song : "", 
    artist : ""
}

const songSearch = async function(){
    let songName = $("#songSearch").find("input").val()
    searchObj.song = songName
    console.log(searchObj)
      
}

const artistSearch = function(){
    let artistName = $("#artistSearch").find("input").val()
    searchObj.artist = artistName
    console.log(searchObj)
    await tempManager.getSongData(searchObj)
    renderer.render(tempManager.songData)
    
}