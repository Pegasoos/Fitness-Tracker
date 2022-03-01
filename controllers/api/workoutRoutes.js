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
        //const newExercise = await Exercise.create(req.body); SAVING PREVIOUS CODE
        //then find the workout the user is adding to and push the new exercise to its exercise array
        const startingWorkout = await Workout.findById(req.params.id);
        const updatedWorkout = await startingWorkout.updateOne({$push: {"exercises": req.body}}, { returnDocument: 'after' });
        //const updatedWorkout = await startingWorkout.updateOne({$push: {"exercises": newExercise._id}}, { returnDocument: 'after' });
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
//get workouts in range for getting the last seven workouts populated with exercise data
router.get('/range', async (req, res) =>{
try{
    const rangedWorkouts = await Workout.aggregate([
        {$addFields:
        {"totalDuration": {$sum:{$sum:"$exercises.duration"}}}
         },
        {$limit:7}]);
    console.log(rangedWorkouts)
    res.status(201).json(rangedWorkouts)
}
catch(err){res.status(400).json(err.message)}
});

module.exports = router;