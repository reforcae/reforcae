var express = require('express');
var api     = express.Router();
var encrypt = require('../../../utils/encrypt.js');
var _       = require('lodash');

exports = module.exports = this_module;

function this_module ( app ) {

    var userModel   = app.models.user;
    var userService = app.services.userService;

    api.route('/')
        .get( function ( req, res )  {
            var start  = req.query.start  || 0,
                limit  = req.query.limit  || 200,
                status = req.query.status || 0,
                sort   = req.query.sort   || { createdAt : -1 };
            var params = {};

            return userService.getAll( userModel, params, start, limit, sort , '' ).spread( function ( users, count ) {
                res.header('X-List-Total', count ).json( users );
            },function ( err ) {
                res.status(500);
                console.error('Error List User');
            });
        })
        .post( function ( req, res )  {
            var user      = req.body;
            user.salt     = encrypt.createSalt();
            user.password = encrypt.hashPwd( user.salt, user.password );
            return userService.create( userModel, user ).then( function ( _user ) {
                res.status(201).json(_user);
            }, function ( err ) {
                if ( err && err.code === 11000 || err && err.code === 11001 ) {
                    var valueErr = new Error('Duplicate Username');
                    res.status(400).send({ err : valueErr.toString() });
                } else {
                    res.status(500).json(err);
                }
            });
        });

    api.route('/:id')
        .get( function ( req, res )  {
            return userService.get( userModel, { _id : req.params.id } ).then( function ( _user ) {
                res.json( _user );
            }, function ( err ) {
                res.status(500).json(err);
            });
        })
        .delete( function ( req, res )  {
            return userService.delete( userModel, req.params.id ).then( function () {
                res.status( 204 ).json( { message : 'User successfully deleted' } );
            }, function ( err ) {
                res.status(500).json(err);
            });
        })
        .put( function ( req, res )  {
            var _id  = req.params.id;
            var json = req.body;
            return userService.update( userModel, _id, json ).then( function ( _user ) {
                res.status( 200 ).json( { message : 'User was updated successfully' } );
            }, function ( err ) {
                if ( err && err.code === 11000 || err && err.code === 11001 ) {
                    var valueErr = new Error('Duplicate Username');
                    res.status(400).send({ err : valueErr.toString() });
                } else {
                    res.status(500).json(err);
                }
            });
        })        

    return api;
};