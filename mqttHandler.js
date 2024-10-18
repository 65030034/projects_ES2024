const mqtt = require('mqtt');

const brokerUrl = 'tcp://broker.mqtt.cool:1883';
const topic = 'power/meter';

module.exports = function (SensorData) {
    const client = mqtt.connect(brokerUrl);

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe(topic, (err) => {
            if (err) {
                console.error('Failed to subscribe:', err);
            }
        });
    });

    client.on('message', async (topic, message) => {
        try {
            const data = JSON.parse(message.toString());

            const sensorData = new SensorData({
                power: data.power,
                voltage: data.voltage,
                current: data.current,
            });

            await sensorData.save();
            console.log('Sensor data saved:', data);
        } catch (err) {
            console.error('Error processing MQTT message:', err);
        }
    });

    client.on('error', (err) => {
        console.error('MQTT Error:', err);
    });
};

