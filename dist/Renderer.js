Handlebars.registerHelper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Handlebars.SafeString(text);
});


class Renderer { 
    renderSong(songData){
        console.log(songData)
        let source = $('#song-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template(songData);
        $('#queryContainer').empty().append(newHTML);
    }
    renderOthers(others){
        console.log(others)
        let source = $('#other-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({others});
        $('#othersContainer').empty().append(newHTML);
    }
    renderFavorites(favorites){
        console.log(favorites)
        let source = $('#favorite-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({favorites});
        $('#favoritesContainer').empty().append(newHTML);
    }
    render(){
        this.renderSong()
        this.renderOthers()
        this.renderFavorites()
    }
}