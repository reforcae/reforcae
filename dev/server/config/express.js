var express    = require("express");

module.exports = function() {

    var app = express();

    app.set( 'port', 4000 );

    app.set( 'view engine', 'ejs');

    app.set( 'views', './dev/server/views'  );

    return app;

};