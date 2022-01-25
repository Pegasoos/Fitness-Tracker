const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
createdAt:{
    type:Date,
    default: Date.now,
    required:true,
},
exercises: [
{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Exercise"
}
]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;