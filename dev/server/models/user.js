var mongoose = require("mongoose");

module.exports = function () {

    var STATUS = ['ONLINE','OFFLINE',"BUSY"];

    var userSchema = new mongoose.Schema({
        first_name   : { type : String, trim : true },
        last_name    : { type : String, trim : true },
        roles        : [ String ],
        phone_number : String,
        username     : { type : String, trim : true },
        salt         : { type : String },
        password     : { type : String , required : true }, 
        last_access  : Date,
        online       : { type : String, enum : STATUS },
        disable      : { type : Boolean, default : false },
        email : {
            type     : String,
            required : true,
            index    : { unique : true  },
            trim     : true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        pass_recover_token: {
            token: { type: String, index: true, unique:true, sparse: true },
            createdAt: Date
        }
    });

    userSchema.set( 'toJSON', {
        virtuals: true,
        transform: function (doc, ret, options) {
            delete ret._id;
            delete ret.__v;
        }
    });

    return mongoose.model( "user", userSchema );
};
