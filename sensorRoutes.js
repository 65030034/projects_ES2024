const express = require('express');
const router = express.Router();
const { getAllSensors, addSensorData } = require('../controllers/sensorController');

router.get('/', getAllSensors);
router.post('/', addSensorData);

module.exports = router;

