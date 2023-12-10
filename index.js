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