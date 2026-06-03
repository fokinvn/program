const fs = require('fs');
const path = require('path');

class CoolingController {
    constructor(pin, gpioPath) {
        this.file = path.join(gpioPath, `pin${pin}`);

        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, "0");
        }
    }

    setState(on) {
        fs.writeFileSync(this.file, on ? "1" : "0");
    }

    getState() {
        return fs.readFileSync(this.file, "utf8").trim() === "1";
    }
}

module.exports = CoolingController;
