var baseService = require('./baseService.js');
var _           = require('lodash');
var Q           = require('q');

// utils
function validateEmail( email ) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

module.exports.getAll = function ( Model, params, start, limit, sort, populates ) {
    return baseService.listAndCount( Model, params, start, limit, sort, populates );
};

module.exports.get = function ( Model, query ) {
    return baseService.get( Model, query );
};

module.exports.create = function ( Model, doc ) { 
    if ( _.isEmpty(doc.email) || _.isEmpty(doc.password) ) {
        return Q.reject( {code:3, httpStatus:401, err: 'Forbidden'}  );
    }

    if ( !_.isEmpty( doc.username )  ) {
        doc.username = doc.username.toLowerCase();
    }

    if ( !validateEmail( doc.email )  ) {
        return Q.reject( {code:3, httpStatus:401, err: 'This Email is invalid'} );
    }

    return baseService.create( Model, doc ).then( function ( _user ) {
        return _user;
    });
};

module.exports.delete = function ( Model, id ) {
    return baseService.delete( Model, { _id : id } );
};

module.exports.update = function ( Model, id, json ) {
    return baseService.update( Model, { _id : id }, json);
};
