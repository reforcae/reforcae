var express = require('express');

exports = module.exports = this_module;

function this_module ( app ) {

    var api = express.Router();

    api.use( '/admin'     , require( './admin'     )( app ) );
    api.use( '/metaadmin' , require( './metaadmin' )( app ) );
    api.use( '/auth'      , require( './auth'      )( app ) );

    return api;

};
