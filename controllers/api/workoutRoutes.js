const router = require('express').Router();
const Workout = require('../../models/workout.js');
const Exercise = require('../../models/exercise.js');
//routes todo:
//1.populate arrays with complete exercise data
//-->2.Complete range routes and math
//-->3.Figure out how to display combined weight Use $sum of weight for all exercises in the workout tthen addFields to make a comboweight field,
//display that on stats page, same concept with distance, check public javascript for combined weight and Date

//get route for getting last workout
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
        const updatedWorkout = await startingWorkout.update({$push: {"exercises": newExercise}});
        //then we populate the newly added exercise information in our exercises array
        const populatedWorkout = await updatedWorkout.populate("exercises");
        res.status(200).json(populatedWorkout);
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
//get workouts in range for getting the last seven workouts;ALSO gets total duration
router.get('/range')

module.exports = router;