var mongoose = require("mongoose");

module.exports = function (uri) {

    var connection;

    if ( !connection ) {
        connection = mongoose.connect( uri, { server :{ poolSize : 15  } } );
    }
  
    //mongoose.set( "debug", true );

    process.on("SIGINT", function () {
        mongoose.connection.close(function(){
            console.log("Mongoose: Desconectando banco.");
            process.exit(0);
        });
    });
  
    mongoose.connection.on("connected", function () {
        console.log( "Mongoose! Conectado em " + uri );
    });

    mongoose.connection.on("disconnected", function () {
        console.log( "Mongoose! disconnected em " + uri );
    });

    mongoose.connection.on("erro", function ( erro ) {
        console.log( "Mongoose! Erro na conexão: " + erro );
    });
  
    return connection;

};
