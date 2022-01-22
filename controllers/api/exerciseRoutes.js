const router = require('express').Router();
const { Workout, Exercise } = require('../../models');
//get route for getting last exercise
router.get("/workouts")
//put for adding exercise to workout collection
router.put("/workouts")
//post for creating a workout/collection
router.post("/workouts")
//get workouts in range for getting the last seven workouts
router.get("workouts/range")
module.exports = router;