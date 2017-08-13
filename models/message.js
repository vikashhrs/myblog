/**
 * Created by Vikash Kumar Sharma on 26-07-2017.
 */

var mongoose = require('mongoose');
var MessageSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    message: {
        type: String,
        required : true
    }


});
module.exports = mongoose.model('Message',MessageSchema);
