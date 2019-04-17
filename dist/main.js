let apiManager = new ApiManager()
let renderer = new Renderer()

      

const querySearch = async function(){
    let query = $("#querySearch").find("input").val()
    if(query != ""){
        await apiManager.getSongID(query)
        console.log(apiManager.songData)
        renderer.render(apiManager)
    }
}

const querySave = async function(){
    let id = $(this).closest(".songCard").attr('id')
    apiManager.saveSong(id)
    
}

const queryDelete = async function(){
    let id = $(this).closest(".songCard").attr('id')
    console.log(id)
    console.log("wow")

    apiManager.removeSong(id)
    
}