const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const mqttHandler = require('./mqttHandler');

const app = express();
const PORT = 3300;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
    }
})();

// Define the schema for sensor data
const sensorSchema = new mongoose.Schema({
    power: Number,
    voltage: Number,
    current: Number,
    timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensorData', sensorSchema);

// Endpoint to fetch sensor data
app.get('/sensor-data', async (req, res) => {
    try {
        const data = await SensorData.find().sort({ timestamp: -1 }).limit(1);
        res.json(data[0] || {});
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Initialize MQTT client
mqttHandler(SensorData);

