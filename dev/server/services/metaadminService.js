var mongoose    = require("mongoose");
var baseService = require("./baseService");

module.exports.create = function ( Model, json ) {
    return baseService.create( Model, json ).then( function ( adm ) {
        return adm;
    });
};
