# step by step 

1. Cara menjalankan program NodeJS, kita bisa menggunakan terminal. Kita bisa mengetikkan perintah node di terminal, lalu mengetikkan nama file JavaScript yang ingin kita jalankan. Contohnya:
node index.js

2. Cara menggunakan npm, kita bisa mengetikkan perintah npm di terminal. Contoh:
npm -v
lalu akan muncul npm version yang telah terinstall.

3. inisiasi project npm dengan menggunakan command `npm init -y`

4. update `package json` dengan menambahkan di bagian script seperti :
```json
"scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
},
```
5. install package yang di perlukan
```bash 
npm install express dotenv cors mysql2 @prisma/client
```

6. install devDevendency karena menggunakan nodemon
```bash
npm install -D nodemon 
npm run start:dev
```

7. lalu akan ada `node_modules` dan `package-lock.json` yang dibuat secara otomatis oleh `npm` dimana file tersebut jangan diubah isinya dan jangan lupa di pus di github.

8. supaya `node_modules` dan `.env` tidak ke push digithub kita akan bikin 1 file namanya `.gitignore` biar `node_modules` dan `.env` tidak ikut up di git.

9. kalau susah bisa dibuat di gitbash atau terminal pake command ini :
```bash
echo node_modules .env >> .gitignore
```

10. inisiasi project dengan membuat 1 file entrypoint, disini saya memakai `index.js`. kalau sudah membuat filenya bisa update `package.json` dimana script untuk memulai aplikasi backend harus ke entrypoint file yang kalian tentukan tadi. contoh discript jadinya 

```json
"scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
},
```

11. import express, dotenv, dan package lain yang awal kita install tadi, buatlah 1 rute untuk mencoba apakah aplikasi berjalan atau tidak.
contohnya:
```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { newsRoutes } = require("./routes/newsRoutes");
const { categoryRoutes } = require("./routes/categoryRoutes");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Default route
app.get("/", async(req, res) => {
    res.send("here is the response");
});

// Routes for 'news'
const newsRoutes = require('./newsRoutes');  // Pastikan file newsRoutes.js telah ada
app.use("/news", newsRoutes);

// Routes for 'categories'
const categoryRoutes = require('./categoryRoutes');  // Pastikan file categoryRoutes.js telah ada
app.use("/categories", categoryRoutes);

// Endpoint untuk mendapatkan semua kategori
app.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// Endpoint untuk mendapatkan semua data dari Database_32
app.get('/database_32', async (req, res) => {
  const data = await prisma.database_32.findMany();
  res.json(data);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is already running at ${PORT}`);
});
```

12. lanjut dalam inisiasi integrasi project ini dengan prisma agar kita bisa terhubung dengan database dan melakukan pengambilan/ masukin data ke database dengan [prisma](https://prisma.io);

13. insiasi project npm yang ingin di integrasikan engn prisma kita hrs install prismanya 

```bash
npm install -D prisma
npx prisma init
```

14. inisiasi jdi mysql 
```bash
npx prisma init --datasource-provider mysql
```

15. lalu akan tambah pada file `.env` dimana `DATABASE_url`dmn nnti diisi sesuai dengan database dri railway, kalau jalanin dri local jalanin dri local dulu aja. dan ada 1 file khsus yang ke generated dalam folder `prisma` namanya `prisma.schema`dmn kalian hrs mendefinisikan code database yg sudah di rencanakan

16. kita bisa buat `schema` database dri yang udah kita rencanain dalam file `schema.prisma` dimana ada sintaxnya sendiri dan kalian bisa baca docnya di prisma docs.

```
model Category {
  id    BigInt  @id @unique(map: "id") @default(autoincrement()) @db.UnsignedBigInt
  Jenis String? @db.Text
}

model Database_32 {
  id      BigInt  @id @unique(map: "id") @default(autoincrement()) @db.UnsignedBigInt
  jenis   String? @db.Text
  judul   String? @db.Text
  publish String? @db.Text
  sumber  String? @db.Text
  content String? @db.Text
  gambar  String? @db.Text
}
```
17. singkronin dtabase yg udh di bikin dengan cara 

```bash
npx prisma migrate dev --name init
```

`npx prisma migrate dev` wajib dilakukan setiap kali kalian sudah selesai mengubah `schema.prisma` atau adanya perubahan pada `schema.prisma` agar database selalu tersingkronisasi
