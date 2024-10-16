const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    bookName:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    available:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Books',bookSchema);
