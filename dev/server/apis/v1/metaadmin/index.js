var express = require('express');
var api     = express.Router();

exports = module.exports = this_module;

function this_module ( app ) {

    var userModel = app.models.user;

    api.route('/')
        .post( function ( req, res ) {
            console.log( "calling metAdmin");
        });

    return api;
};