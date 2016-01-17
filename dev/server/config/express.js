var express    = require("express");
var corser     = require("corser");
var load       = require("express-load");
var bodyParser = require("body-parser");

module.exports = function ( config ) {

    var app = express();

    app.set( 'port', 4000 );

    app.set( 'view engine', 'ejs');

    app.set( 'views', './dev/server/views'  );

    app.use( express.static( config.rootPath +'/frontend' ) );

    app.use( bodyParser.urlencoded( { extended : true } ) );

    app.use( bodyParser.json() );

    app.use( corser.create({
        methods: corser.simpleMethods.concat(["PUT", "DELETE"]),
        requestHeaders: corser.simpleRequestHeaders.concat(["Authorization","X-List-Total","x-auth",'X-Acess-Token'])
    }));
    
    load( 'models', { cwd : './dev/server' } )
        .then('services')
        .into(app)

    var apiV1 = require('./../apis/v1');
    app.use( '/apis/v1/', apiV1(app) );

    return app;

};
