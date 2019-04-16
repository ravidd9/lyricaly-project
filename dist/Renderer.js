class Renderer { 
    render(songData){
        console.log(songData)
        let source = $('#song-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({songData});
        $('.lyricsAndSave').empty().append(newHTML);
    }
}