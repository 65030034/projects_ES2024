const sensorDataDiv = document.getElementById('sensor-data');

// Function to fetch sensor data
async function fetchSensorData() {
  try {
    const response = await fetch('/api/sensors');
    const data = await response.json();

    sensorDataDiv.innerHTML = '';
    data.forEach(sensor => {
      const sensorElement = document.createElement('p');
      sensorElement.textContent = `Timestamp: ${new Date(sensor.timestamp).toLocaleString()}, Power: ${sensor.power}W`;
      sensorDataDiv.appendChild(sensorElement);
    });
  } catch (error) {
    console.error('Error fetching sensor data:', error);
  }
}

// Fetch data on page load
fetchSensorData();

