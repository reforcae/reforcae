var express = require('express');
var api     = express.Router();

exports = module.exports = this_module;

function this_module ( app ) {

    var authService = app.services.authService;
    var userModel   = app.models.user;

    api.use(function ( req, res, next ) { 
        if( /^\/(authorize|users)/.test( req.url ) ) {
            authService.get( req.headers['x-auth'], userModel ).then( function ( auth ) {
                req.payload = { _id: auth._id, roles: auth.roles };
                next();
            }, function ( err ) {
                res.status( 403 ).json( { error : "Unauthorized" } );
            });

        } else {
            next();
        }
    });

    api.use( '/users' , require('./users')( app ) );

    api.get( '/authorize', function ( req, res ) {
        res.json( req.payload );
    }); 

    return api;

};
