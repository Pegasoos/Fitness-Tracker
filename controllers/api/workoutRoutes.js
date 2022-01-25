const router = require('express').Router();
const Workout = require('../../models/workout.js');
const Exercise = require('../../models/exercise.js');
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
//put for adding exercise to workout collection
router.put('/:id', async (req, res) =>{
    try{
        const startingWorkout = await Workout.findById(req.params.id);
        const updatedWorkout = await startingWorkout.update({...req.body});
        res.status(200).json(updatedWorkout);
    }
    catch(err){res.status(400).json(err)}
})
//post for creating a workout/collection
router.post("/", async ({body}, res) => {
    try{
    const newWorkout = await Workout.create(body)
    res.status(201).json(newWorkout)
    }
    catch(err){
    res.status(400).json(err)
    }
});
//get workouts in range for getting the last seven workouts;ALSO gets total duration
router.get('/range')

module.exports = router;