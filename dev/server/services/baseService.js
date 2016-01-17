var Q        = require("q");
var mongoose = require("mongoose");
var _        = require("lodash");

module.exports.listAndCount = function ( Model, params, start, limit, sort, populates ) {
    var _query = {};

    var opts   = {
        skip  : start,
        limit : limit,
        sort  : sort
    };  

    var query  = Model.find(_query, {}, opts);

    if ( populates ) {
        _.each( _.isArray( populates ) ? populates : [populates], function (p) {
            query.populate(p);
        });
    }

    return Q.all([
        Q.nsend( Model, 'find' , query ),
        Q.nsend( Model, 'count' )
    ]);
};

module.exports.create = function ( Model, json ) {
    var doc = new Model(json);
    return Q.nsend( doc, 'save' ).spread( function (doc) {
        return doc;
    });
};

module.exports.get = function ( Model, query ) {
    return Q.nsend( Model, 'findById' , query );   
};

module.exports.delete = function ( Model, query ) {
    var _query = Model.remove(query);
    return Q.nsend( Model, 'remove' , _query );   
};

module.exports.update = function ( Model, id, json ) {
    return Q.nsend( Model, 'update', id, json ).then( function ( _client ) {
        return _client;
    });
};