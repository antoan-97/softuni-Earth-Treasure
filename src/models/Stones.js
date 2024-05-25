const mongoose = require('mongoose');

const stonesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [2, 'Name should be at least 2 characters long!'],
    },
    color:{
        type:String,
        required:true,
        minLength: [2, 'Color should be at least 2 characters long!'],
    },
    category:{
        type:String,
        required:true,
        minLength: [3, 'Category should be at least 3 characters long!'],
    },
    image:{
        type:String,
        required:true,
        match:[/^https?:\/\//, "Invalid URL!"]
    },
    location:{
        type:String,
        required:true,
        minLength: [5, 'Location should be be between 5 and 15 characters long!'],
        maxLength: [15,'Location should be be between 5 and 15 characters long!'],
    },
    formula:{
        type:String,
        required:true,
        minLength: [3, 'Formula should be be between 3 and 30 characters long!'],
        maxLength: [30,'Formula should be be between 3 and 30 characters long!'],
    },
    description:{
        type:String,
        required:true,
        minLength: [10, 'Description should be at least 10 characters long!'],
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