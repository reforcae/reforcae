var baseService = require('./baseService.js');

module.exports.getAll = function ( Model, params, start, limit, sort, populates ) {
    return baseService.listAndCount( Model, params, start, limit, sort, populates );
};