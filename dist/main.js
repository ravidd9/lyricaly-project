let apiManager = new ApiManager()
let renderer = new Renderer()

      

const querySearch = async function(){
    let query = $("#querySearch").find("input").val()
    if(query != ""){
        await apiManager.getSongData(query)
        renderer.render(apiManager.songData)
    }
}
