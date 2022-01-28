const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
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
        min:1,
    },
    reps:{
        type:Number,
        min:1
    },
    duration:{
        type:Number,
        min:0
    },
    distance:{
        type:Number,
        min:0
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true,
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema, 'exercises');

module.exports = Exercise;