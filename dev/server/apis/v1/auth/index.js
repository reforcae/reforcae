var express  = require('express');
var mongoose = require('mongoose');
var api      = express.Router();
var moment   = require('moment');
var Q        = require('q');
var _        = require('lodash');

exports = module.exports = this_module ;

function this_module (app) {

    var userModel   = app.models.user;
    var authService = app.services.authService;
    var userService = app.services.userService;

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

    api.get( '/confirm/:token/:expire', function ( req, res ) {
        var expire = req.params.expire;
        var token  = req.params.token;
        return authService.validateToken( userModel, token, expire ).spread(function ( user, count, err ) {
            if ( err ) {
                res.status(500).json({message: 'Internal Server Error'});
            }
            else if ( count ) {
                // If the actually date is less than that date was created + days expired  return ok
                if ( moment() < moment(user.pass_recover_token.createdAt).add( Number( expire ), 'd') && expire == 5 ) {
                    // Do Activation of email
                    userService.activateEmail( userModel, user.id ).then(function ( res ) {
                        if ( !res.ok ) Q.reject(res.json({code:2, httStatus:400, desc: 'Bad Request.'}));
                    });
                    res.status(200).json({'count':count, success:true})
                }
                if ( count == -1 ) {
                    return Q.reject({code:2, httStatus:400, desc: 'The link has expired. Please starte the process angain.'});
                } 
            } else {
                res.status(401).json({code:2, httStatus:401, desc: 'The link is inválid.'});
            }

        }, function (err) {
            console.log(err);
            res.status(err).json(err)
        });
    });
    
    return api;

}; 