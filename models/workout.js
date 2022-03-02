const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
day:{
    type:Date,
    default: Date.now,
    required:true,
},
exercises: [
 {name:{
     type:String,
      required:true
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
    sets:{
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
}
]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;