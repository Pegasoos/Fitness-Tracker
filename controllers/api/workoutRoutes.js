const router = require('express').Router();
const Workout = require('../../models/workout.js');

router.get('/', async (req, res) =>{
    try{
        const lastWorkout =
        await Workout.aggregate([
            {$addFields:
            {"totalDuration": {$sum:{$sum:"$exercises.duration"}}}
             },
            {$limit:1}]);
        res.json(lastWorkout);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});
//put for adding exercise to workout collection and populating workout
router.put('/:id', async (req, res) =>{
    try{
        const startingWorkout = await Workout.findById(req.params.id);
        const updatedWorkout = await startingWorkout.updateOne({$push: {"exercises": req.body}}, { returnDocument: 'after' });
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