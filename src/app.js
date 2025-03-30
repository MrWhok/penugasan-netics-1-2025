const express = require('express');
const app = express();
const moment = require('moment-timezone');
const startTime=Date.now();

app.get('/health', (req, res) => {
    const currentTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss');
    const uptime = (Date.now() - startTime) / 1000;
    res.json({
        nama: "Tunas Bimatara Chrisnanta Bidiman",
        nrp: "5025231999",
        status: "DOWN",
        timestamp: currentTime,
        uptime: uptime
    });
});

const server=app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = { app, server };
