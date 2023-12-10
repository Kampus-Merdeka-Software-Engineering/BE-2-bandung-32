const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
