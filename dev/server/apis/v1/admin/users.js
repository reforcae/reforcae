var express = require('express');
var api     = express.Router();

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

            return userService.getAll( userModel, params, start, limit, sort , '' )
                .spread( function ( users, count ) {
                    res.header('X-List-Total', count ).json( users );
                },function ( err ) {
                    res.status(500);
                    console.error('list contact error');
                });
        });
    return api;
};