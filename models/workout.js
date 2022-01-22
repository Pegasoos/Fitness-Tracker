const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    
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

const Workout = mongoose.model("Exercise", workoutSchema);

module.exports = Workout;