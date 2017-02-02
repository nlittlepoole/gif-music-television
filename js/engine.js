function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        //$('<img/>')[0].src = this;
        // Alternatively you could use:
        (new Image()).src = this;
    });
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function gif_theme(theme){
    off = Math.floor(Math.random() * 4000)
    endpoint = 'https://api.giphy.com/v1/gifs/search?q=' + theme + '&api_key=dc6zaTOxFJmzC&offset=' + off + '&limit=10'
    $.getJSON(endpoint, 
        function(data) {
            gifs = data["data"];
            var urls = []
            var body = document.getElementsByTagName('body')[0];
            for (j = 0; j < gifs.length; j++) { 
                urls.push('https://media.giphy.com/media/' + gifs[j]["id"]+ '/giphy.gif')
            }
            body.style.backgroundImage = 'url('+ urls[0] + ')';
            preload(urls)
            var counter = 1;
            var i = setInterval(function(){
                var body = document.getElementsByTagName('body')[0];
                url = urls[counter]
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

