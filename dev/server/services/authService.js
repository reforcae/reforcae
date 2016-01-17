var baseService = require('./baseService');
var _           =  require('lodash');
var Q           = require('q');
var mongoose    = require('mongoose');
var encrypt     = require('../utils/encrypt.js');
var _model;

function _getUserByEmail ( email ) {
    return Q.nsend( _model, 'findOne', { 
        email : email 
    }).then(function ( client ) {
        if ( !client ) return Q.reject({code:2, httStatus:403, desc: 'Unauthorized'});
        return client;
    });
};

function validateEmail( email ) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function _removeAttritubesSchema ( obj ) {
    var newObj = obj.toObject();
    delete newObj.salt;
    delete newObj.hashed_pwd;
    delete newObj.__v;
    return newObj;
};

module.exports.login = function ( Model, email, password ) {
    if ( !_model ) 
        _model = Model;

    if ( _.isEmpty(email) || _.isEmpty(password) ) 
        return Q.reject( {code:2, httStatus:403, desc: 'Unauthorized'} );
    
    if ( !validateEmail( email ) ) 
        return Q.reject( {code:2, httStatus:403, desc: 'Unauthorized'} );

    return _getUserByEmail( email ).then(function ( user ) {
        return ( !encrypt.validatePassword( user.salt, password, user.password ) )
        ? Q.reject({code: 2,httpStatus: 404, desc: 'Unauthorized'})
        : _removeAttritubesSchema( user );
    }, function (e) {
        return e;
    });
};

module.exports.get = function ( id, model ) {
    return Q.nsend( model, 'findOne', { _id : id } ).then(function (auth) { 
        return (!auth)
        ? Q.reject({httpStatus:401, message:'Unauthorized'})
        : auth;
    });
};
