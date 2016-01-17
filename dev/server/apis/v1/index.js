var express = require('express');

exports = module.exports = this_module;

function this_module ( app ) {

    var api = express.Router();

    api.use( '/metaadmin' , require( './metaadmin' )( app ) );
    
    app.get( '/', function ( req,res ) {
        res.render( 'index' );
    });

    return api;

};
