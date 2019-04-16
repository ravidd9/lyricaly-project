let apiManager = new ApiManager()
let renderer = new Renderer()

      

const querySearch = async function(){
    let query = $("#querySearch").find("input").val()
    if(query != ""){
        await apiManager.getSongID(query)
        console.log("got data")
        renderer.render(apiManager.songData)
    }
}

const querySave = async function(){
    let id = $(this).closest(".songCard").attr('id')
    apiManager.saveSong(id)
    
}

