var http     = require("http");
var env      = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config   = require("./config/config")[env];
var mongoose = require("./config/database.js")("mongodb://localhost:27017/reforcae");
var app      = require("./config/express")(config);

app.get('/', function (req, res){
    res.render('index');
});

http.createServer(app).listen(app.get("port"), function() {
  console.log( "express running on the port " + app.get("port") );
});
