const mongoose = require('mongoose');

const stonesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    formula:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    likedList:[
        {
        type:mongoose.Types.ObjectId,
        ref: 'User',
    }
],
owner:{
    type:mongoose.Types.ObjectId,
    ref:'User',
},

});

const Stones = mongoose.model('Stones', stonesSchema);

module.exports = Stones;