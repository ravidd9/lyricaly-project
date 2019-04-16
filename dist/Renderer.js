Handlebars.registerHelper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Handlebars.SafeString(text);
});


class Renderer { 
    render(songData){
        console.log(songData)
        let source = $('#song-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template(songData);
        $('#queryContainer').empty().append(newHTML);
    }
}