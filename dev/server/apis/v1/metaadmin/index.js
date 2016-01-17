var express = require('express');
var api     = express.Router();
var config  = require('../../../config/config.js');

exports = module.exports = this_module;

function this_module ( app ) {

    var userModel        = app.models.user;
    var metaAdminToken   = config.metaadmin.token;

    api.route('/')
        .post( function ( req, res ) {
            console.log( "calling metAdmin");
        });

    return api;
};