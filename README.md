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
    - moment-timezone
    Berguna untuk mendapatkan timestamp pada zona tertentu.
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
4. Push ke docker hub
    - login
    ```bash
    docker login -u <your-username> -p <your-password>
    ```
    - push
    ```bash
        docker push aydin3008/end:api latest
    ```



## Deployment dengan Azurlane
### STEP-STEP
1. Membuat container registry
Mengisi semua yang diperlukan pada [link ini](https://portal.azure.com/?Microsoft_Azure_Education_correlationId=d3db8e9d-042b-41d5-8f02-71d38032b4b8&Microsoft_Azure_Education_newA4E=true&Microsoft_Azure_Education_asoSubGuid=39d178a7-04b4-4d5b-b743-02832f4f10ad#view/Microsoft_Azure_Marketplace/GalleryItemDetailsBladeNopdl/id/Microsoft.ContainerRegistry/selectionMode~/false/resourceGroupId//resourceGroupLocation//dontDiscardJourney~/false/selectedMenuId/home/launchingContext~/%7B%22galleryItemId%22%3A%22Microsoft.ContainerRegistry%22%2C%22source%22%3A%5B%22GalleryFeaturedMenuItemPart%22%2C%22VirtualizedTileDetails%22%5D%2C%22menuItemId%22%3A%22home%22%2C%22subMenuItemId%22%3A%22Search%20results%22%2C%22telemetryId%22%3A%221c984327-6cb3-435b-98b8-4728b60c05f4%22%7D/searchTelemetryId/79a766f5-00ac-4c2b-93f4-3b9b8f140dee)


2. Buat container instance
Mengisi pada link [ini](https://portal.azure.com/?Microsoft_Azure_Education_correlationId=d3db8e9d-042b-41d5-8f02-71d38032b4b8&Microsoft_Azure_Education_newA4E=true&Microsoft_Azure_Education_asoSubGuid=39d178a7-04b4-4d5b-b743-02832f4f10ad#view/Microsoft_Azure_Marketplace/GalleryItemDetailsBladeNopdl/id/Microsoft.ContainerInstances/selectionMode~/false/resourceGroupId//resourceGroupLocation//dontDiscardJourney~/false/selectedMenuId/home/launchingContext~/%7B%22galleryItemId%22%3A%22Microsoft.ContainerInstances%22%2C%22source%22%3A%5B%22GalleryFeaturedMenuItemPart%22%2C%22VirtualizedTileDetails%22%5D%2C%22menuItemId%22%3A%22home%22%2C%22subMenuItemId%22%3A%22Search%20results%22%2C%22telemetryId%22%3A%225ea4c72a-7822-4ddb-82b3-2f67711baec6%22%7D/searchTelemetryId/58eb99df-e507-4007-9477-3de6c5f84aa6)

3. Pilih image source Other registry
4. Masukan image yang sudah di push pada docker hub
5. Tambahkan port 3000 dengan protocol TCP
6. Hasil
    
    ![](media/image3.1.png)

    Dalam gambar tersebut terlihat bahwa telah sukses men deploy.