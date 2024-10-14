const Sensor = require('../models/sensorModel');

// GET all sensor data
exports.getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sensor data' });
  }
};

// POST sensor data
exports.addSensorData = async (req, res) => {
  const { power } = req.body;
  const newSensor = new Sensor({ power });

  try {
    const savedSensor = await newSensor.save();
    res.status(201).json(savedSensor);
  } catch (error) {
    res.status(500).json({ message: 'Error saving sensor data' });
  }
};

