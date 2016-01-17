var crypto = require('crypto');

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
};

function  hashPwd( salt, pwd ) {
    var hmac = crypto.createHmac( 'sha1', salt );
    return hmac.update(pwd).digest('hex');
};    

function validatePassword( salt, passwordToMatch, hashed_pwd ) {
    return hashPwd( salt, passwordToMatch ) === hashed_pwd;
};

module.exports = {
    'hashPwd' : hashPwd, 
    'createSalt' : createSalt, 
    'validatePassword' : validatePassword
};