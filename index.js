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
app.use("/news", newsRoutes);

// Routes for 'categories'
app.use("/categories", categoryRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is already running at ${PORT}`);
});
