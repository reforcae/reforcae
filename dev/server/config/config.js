var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development : {
    rootPath : rootPath,
    db : 'mongodb://localhost:27017/reforcae',
    port : process.env.PORT || 4000
  },
  metaadmin : {
    token : "dGhpc2lzYXNlY3JldHRva2VubGVv"
  } 
};