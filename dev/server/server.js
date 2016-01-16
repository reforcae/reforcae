var http   = require("http");
var app    = require("./config/express")();

app.get('/', function (req, res){
    res.render('index');
});

http.createServer(app).listen(app.get("port"), function() {
  console.log( "express running on the port " + app.get("port") );
});
