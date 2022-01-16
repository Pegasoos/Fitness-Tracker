const router = require('express').Router();

const exerciseRoutes = require('./exerciseRoutes');

router.use('/exercise', exerciseRoutes);

module.exports = router;