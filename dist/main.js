let apiManager = new ApiManager()
let renderer = new Renderer()

      
const loadPage = async function(){
    await apiManager.getDataFromDB()
    renderer.render(apiManager)
}

const querySearch = async function(){
    let query = $("#querySearch").find("input").val()
    if(query != ""){
        apiManager.history.push(query)
        await apiManager.getSongID(query)
        renderer.render(apiManager)
    }
}

const querySave = async function(){
    let id = $("#container").closest(".songCard").attr('id')
    console.log(id)
    await apiManager.saveSong(id)
    loadPage()
}

const queryDelete = async function(){
    let id = $("#container").find(".songCard").attr('id')
    console.log(id)
    await apiManager.removeSong(id)
    loadPage()
}

loadPage()