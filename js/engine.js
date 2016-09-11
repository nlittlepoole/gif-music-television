function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

function gif_theme(theme){
    off = Math.floor(Math.random() * 4000)
    endpoint = 'http://api.giphy.com/v1/gifs/search?q=' + theme + '&api_key=dc6zaTOxFJmzC&offset=' + off + '&limit=10'
    $.getJSON(endpoint, 
        function(data) {
            gifs = data["data"];
            console.log(gifs);
            var body = document.getElementsByTagName('body')[0];
            url = 'https://media.giphy.com/media/' + gifs[0]["id"]+ '/giphy.gif'
            body.style.backgroundImage = 'url('+ url + ')';
            var counter = 1;
            var i = setInterval(function(){
                console.log(counter)
                var body = document.getElementsByTagName('body')[0];
                url = 'https://media.giphy.com/media/' + gifs[counter]["id"]+ '/giphy.gif'
                body.style.backgroundImage = 'url('+ url + ')';
                counter++;
                if(counter === 10) {
                    clearInterval(i);
                    gif_theme(theme);
                }
            }, 3500);
        }
    );
}

