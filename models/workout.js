const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
createdAt:{
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
    //old config in case of failure
    //type:Schema.Types.ObjectId,
    //ref:"Exercise"
]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;