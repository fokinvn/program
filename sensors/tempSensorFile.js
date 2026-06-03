const fs = require('fs');

class FileTemperatureSensor {
    constructor(path) {
        this.path = path;
    }

    readTemperature() {
        try {
            const data = fs.readFileSync(this.path, 'utf8').trim();
            return parseFloat(data);
        } catch (err) {
            return null;
        }
    }
}

module.exports = FileTemperatureSensor;
