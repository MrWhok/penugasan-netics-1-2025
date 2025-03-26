# penugasan-netics-1-2025

Pada repository ini berisi step-step pengerjaan dan dokumentasi untuk tugas 1 oprec netics.

## Pembuatan API endpoint

Dalam pembuatan API endpoint ini, saya menggunakan bahasa pemrograman yaitu javascript-express.

### STEP-STEP
1. Menginisialisasi projek baru dengan
    ```bash
    npm init -y
    ```
2. Menginstall dependensi yang dibutuhkan
    - express
    Berguna untuk memudahkan dalam pembuatan API.
    - nodemon
    Berguna untuk mengotomasi restart dari node.js saat terjadi perubahan kode.
    - moment
    Berguna untuk memformat date.
    ```bash
        npm install -g nodemon
        npm install express
        npm install moment
    ```
3. Mengupdate package.json
    ```js
    {
            "name": "express-api",
            "version": "1.0.0",
            "description": "",
            "main": "app.js",
            "scripts": {
            "start": "node app.js",
            "dev": "nodemon app.js"
        },
            "dependencies": {
            "express": "^4.17.1",
            "moment": "^2.29.1"
        },
            "devDependencies": {
            "nodemon": "^2.0.22"
        }
    }
    ```
4. Menulis kode API
```js
const express = require('express');
const app = express();
const moment = require('moment');
const startTime=Date.now();

app.get('/health', (req, res) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
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
    console.log('Server is running on port 8080');
});

```
5. Testing endpoint 
    - Jalankan kode
        ```bash
        npm run dev
        ```
    - Buka browser lalu masukan url
        ```
        http://localhost:3000/health
        ```
    - Hasil
        ![media/image1.1.png]
    
    Dalam gambar diatas terlihat bahwa kode sudah berjalan dengan baik.
