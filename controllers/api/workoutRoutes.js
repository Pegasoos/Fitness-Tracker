const router = require('express').Router();
const Workout = require('../../models/workout.js');
const Exercise = require('../../models/exercise.js');

router.get('/', async (req, res) =>{
    try{
        const lastWorkout = await Workout.find({});
        res.json(lastWorkout);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});
//put for adding exercise to workout collection and populating workout
router.put('/:id', async (req, res) =>{
    try{//first create the exercise with information from the user input
        const newExercise = await Exercise.create(req.body);
        //then find the workout the user is adding to and push the new exercise to its exercise array
        const startingWorkout = await Workout.findById(req.params.id);
        const updatedWorkout = await startingWorkout.updateOne({$push: {"exercises": newExercise._id}}, { returnDocument: 'after' });
        res.status(200).json(updatedWorkout);
    }
    catch(err){res.status(400).json(err.details)}
})
//post for creating a workout/collection
router.post("/", async ({body}, res) => {
    try{
    const newWorkout = await Workout.create(body)
    res.status(201).json(newWorkout)
    }
    catch(err){
    res.status(400).json(err.details)
    }
});
//get workouts in range for getting the last seven workouts
//routes todo:
//-->1.Populate Workouts
//-->2.Complete range routes and math
//-->3.Use $sum of the duration for all exercises in the workout then addFields to make a totalDuration field
router.get('/range', async (req, res) =>{
try{
    const workoutRange = await Workout.find({}).limit(7).populate("exercises")
    console.log(workoutRange)
    res.status(201).json(workoutRange)
}
catch(err){res.status(400).json(err.message)}
});

module.exports = router;