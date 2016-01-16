var express    = require("express");
var corser     = require("corser");
var bodyParser = require("body-parser");

module.exports = function() {

    var app = express();

    app.set( 'port', 4000 );

    app.set( 'view engine', 'ejs');

    app.set( 'views', './dev/server/views'  );

    app.use( express.static( config.rootPath +'/frontend' ) );

    app.use(bodyParser.urlencoded({extended: true}));

    app.use(bodyParser.json());

    app.use(corser.create({
        methods: corser.simpleMethods.concat(["PUT", "DELETE"]),
        requestHeaders: corser.simpleRequestHeaders.concat(["Authorization","X-List-Total","x-auth",'X-Acess-Token'])
    }));

    return app;

};