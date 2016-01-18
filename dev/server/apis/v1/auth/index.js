var express  = require('express');
var mongoose = require('mongoose');
var api      = express.Router();

exports = module.exports = this_module ;

function this_module (app) {

    var userModel        = app.models.user;
    var authService = app.services.authService;

    api.post( '/login', function ( req, res ) {
        var email    = req.body.email;
        var password = req.body.password;
        return authService.login( userModel, email, password ).then(function ( auth ) {
            res.json(auth);
        }, function (err) {
            console.log(err);
            res.status(err).json(err)
        });
    });
    
    return api;

};
