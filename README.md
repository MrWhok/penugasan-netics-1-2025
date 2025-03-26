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

    
        ![](media/image1.1.png)
    
    Dalam gambar diatas terlihat bahwa kode sudah berjalan dengan baik.

## Implementasi dengan Docker

Terdapat 2 stage pada implementasi Dockerfile nya, yaitu stage build dan stage runtime. Setelah menjadi docker image akan dipush ke docker hub.

### STEP-STEP
1. Stage build
```Dockerfile
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .
```

Dapat dilihat bahwa `COPY package*.json` dilakukan terpisah karena jika tidak terdapat perubahan package*.json maka `npm install` tidak akan dijalankan. Akan tetapi, jika kita melakukan `COPY . .` secara langsung dan terdapat perubahan file apapun maka akan merusak cache sehingga mengharuskan untuk `npm install` lagi. 

2. Stage runtime
```Dockerfile
FROM node:18-alpine As runtime

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app .

EXPOSE 3000

CMD [ "node","app.js" ]
```

Pada stage tersebut akan meng copy hasil dari stage build ke stage runtime. Dapat dilihat bahwa `node_modules` di copy terlebih dahulu karena alasan caching seperti pada stage build.

3. Testing endpoint dengan docker 
    - Build menjaid docker image
        ```bash
        docker build -t end-api:latest .
        ```
    - Jalankan docker container
        ```bash
        docker run -p 3000:3000 end-api
        ```
    - Hasil
    

        ![](media/image2.1.png)
    
    Dalam gambar diatas terlihat bahwa kode sudah berjalan dengan baik.

