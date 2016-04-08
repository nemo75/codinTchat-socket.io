var elixir = require('laravel-elixir');
/**
 destination folder
 **/
var dest = 'public/';

//trailing slash required.
elixir.config.assetsDir = 'resources/assets/'; 

elixir.config.publicPath = dest;

elixir.config.js.browserify.transformers.push({
    name: 'babelify',
    options: {}
});

elixir(function(mix) {
    mix.sass('app.scss', dest + 'css/style.css');
});

elixir(function(mix) {
    mix.browserify('app.js', dest + 'js/bundle.js', null, {
        global: true
    });
});

elixir(function(mix) {
    mix.browserSync({
      server:'./public',
      proxy: false
    });
});