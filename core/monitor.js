const fs = require('fs');
const FileTemperatureSensor = require('../sensors/tempSensorFile');
const CoolingController = require('../controllers/coolingController');
const Logger = require('./logger');

class Monitor {
    constructor(configPath = 'config/settings.json') {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        this.threshold = config.temp_threshold;
        this.sensor = new FileTemperatureSensor(config.sensor_file);
        this.cooling = new CoolingController(config.cooling_gpio_pin, config.gpio_path);
    }

    runCheck() {
        const temp = this.sensor.readTemperature();
        if (temp === null) {
            Logger.log("Ошибка: датчик недоступен.");
            return;
        }

        Logger.log(`Температура: ${temp}°C`);

        if (temp > this.threshold && !this.cooling.getState()) {
            Logger.log("Температура выше порога — включаем охлаждение.");
            this.cooling.setState(true);
        } else if (temp <= this.threshold && this.cooling.getState()) {
            Logger.log("Температура нормальная — выключаем охлаждение.");
            this.cooling.setState(false);
        }
    }
}

module.exports = Monitor;
