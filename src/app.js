const express = require('express');
const app = express();
const moment = require('moment-timezone');
const startTime=Date.now();

app.get('/health', (req, res) => {
    const currentTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss');
    const uptime = (Date.now() - startTime) / 1000;
    res.json({
        nama: "Tunas Bimatara Chrisnanta Budiman",
        nrp: "5025231999",
        status: "UP",
        timestamp: currentTime,
        uptime: uptime
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
