const express = require('express');
const newsRoutes = express.Router();
const { prisma } = require("../config/prisma");

//get all news
newsRoutes.get("/", async(req, res) => {
    const news = await prisma.news.findMany({
        include: {
           Category: true,
        },
    });
    res.status(200).send(news);
});

//create new news
newsRoutes.post("/", async (req, res) => {
    const newnews = await prisma.news.create({
    data: {
        id: req.body.id,
        jenis: req.body.jenis,
        judul: req.body.judul,
        publish: req.body.publish,
        sumber: req.body.sumber,
        content: req.body.content,
        gambar: req.body.gambar,
        categoryId: parseInt(req.body.categoryId),
    },
});
    res.status(201).json({
        message: "news created",
        data: newnews,
    });
});

//get news by id
newsRoutes.get("/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const news = await prisma.news.findMany({
    where: {
        categoryId: parseInt(categoryId),
    },
});
    res.status(200).send(news);
});


module.exports = { newsRoutes };
