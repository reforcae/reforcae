var express = require('express');
var api     = express.Router();
var config  = require('../../../config/config.js');
var encrypt = require('../../../utils/encrypt.js');

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


    /**
     * 
     *  Receive the post with data of user
     *  -Create salt and generate password
     *  -Add role admin
     *  -Create the user admin and return JSON if was success or return err
     * 
     */
    api.route('/')
        .post(function ( req, res ) {

            var json        = req.body;
            json.username   = json.username.toLowerCase();
            json.salt       = encrypt.createSalt();
            json.hashed_pwd = encrypt.hashPwd( json.salt, json.hashed_pwd );
            
            if ( !userModel.hasOwnProperty( 'roles' ) ) { 
                json.roles = ['ADMIN'];
            }

            return metaAdminService.create( userModel, json ).then( function ( adm ) {
                res.status( 201 ).json("Admin was Created with success");
            }).catch( function ( e ) {
                if ( e && e.code === 11000 || e && err.code === 11001 ) {
                    var valueErr = new Error( 'This email is already used' );
                    res.status(400);
                    return res.send({ err : valueErr.toString() });
                } else {
                    res.status(500).json({err : 'An error has occurred' + e });
                }
            });
        })

    return api;
};