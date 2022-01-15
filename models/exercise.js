const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    type: {
        type:String,
        required:true,
    },
    weight: {
        type:Number,
    },
    reps:{
        type:Number,
    },
    duration:{
        type:Number,
    },
    distance:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;