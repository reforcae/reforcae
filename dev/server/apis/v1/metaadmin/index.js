var express = require('express');
var api     = express.Router();
var config  = require('../../../config/config.js');

exports = module.exports = this_module;

function this_module ( app ) {

    var userModel        = app.models.user;
    var metaAdminToken   = config.metaadmin.token;
    var metaAdminService = app.services.metaadminService;

    /**
     * 
     * Verify if the post has a token secret. This allow access for route metaadmin/ 
     * @return {next or {}} next to middlware or return error
     * 
     */
    api.use( function ( req, res, next ) {
        ( req.headers.authorization && req.headers.authorization.split(' ')[1] == metaAdminToken ) 
        ? next()
        : res.status(401).json({ error: 401, message: 'Unauthorized'});
    });


    api.route('/')
        .post( function ( req, res ) {
            console.log( "calling metAdmin");
        });

    return api;
};