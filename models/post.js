/**
 * Created by Vikash Kumar Sharma on 26-07-2017.
 */

var mongoose = require('mongoose');
var PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    dateofcreation : {
        type : String,
        required : true
    }


});
module.exports = mongoose.model('Post',PostSchema);
