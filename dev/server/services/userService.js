var baseService = require('./baseService.js');
var _           = require('lodash');
var Q           = require('q');
var sendgrid    = require('sendgrid')('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');
var fs          = require('fs');
var Hogan       = require('hogan.js');

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

    if ( _.isUndefined( doc.roles )) {
        doc.roles = ['STUDENT'];
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

var templateWellcome = fs.readFileSync('./dev/server/views/default/default.hjs','utf-8');
var compiledTemplate = Hogan.compile(templateWellcome);

module.exports.welcomeMessage = function ( to, name, token, expire ) {
    sendgrid.send({
        to      :  to,
        from    :  'reforcae@gmail.com',
        subject :  'Equipe Reforcae: Bem vindo, ative seu cadastro',
        html    :  compiledTemplate.render( { name: name, token: token, expire: expire } )
    }, function(err, json) {
        if (err) { 
            return ('Erro ao enviar email.');
            Q.reject( { message : 'Email não pode ser enviado' } ); 
        }
        return ({ message : 'Email eviado com Sucesso ok!!'}) ;
    });
};

module.exports.activateEmail = function ( model, id ) {
    return doActivation( model, id );
};

function doActivation ( model, id ) {
    return Q.nsend( model, 'update', { _id: id }, { disable : false } );
};
