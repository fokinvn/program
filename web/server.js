const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Раздаём стили
app.use('/style', express.static(path.join(__dirname, 'style')));

// Инициализация монитора
const Monitor = require('../core/monitor');
const monitor = new Monitor();

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API — получить статус
app.get('/status', (req, res) => {
    const temp = monitor.sensor.readTemperature();
    const cooling = monitor.cooling.getState();
    res.json({ temperature: temp, cooling: cooling });
});

// API — включить
app.get('/cooling/on', (req, res) => {
    monitor.cooling.setState(true);
    res.json({ status: 'on' });
});

// API — выключить
app.get('/cooling/off', (req, res) => {
    monitor.cooling.setState(false);
    res.json({ status: 'off' });
});

app.listen(port, () => {
    console.log(`Web server started on port ${port}`);
});

