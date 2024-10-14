const express = require('express');
const mongoose = require('mongoose');
const sensorRoutes = require('./backend/routes/sensorRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/sensors', sensorRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/power-meter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

