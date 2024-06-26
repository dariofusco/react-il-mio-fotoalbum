const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;
const errorHandler = require("../middlewares/errorHandler.js");
const deletePic = require("../utils/deletePic.js");

const store = async (req, res) => {

    const { title, description, categoryId } = req.body;

    const data = {
        title,
        description,
        visible: req.body.visible ? true : false
    }

    if (categoryId) {
        data.categoryId = parseInt(categoryId);
    }

    if (req.file) {
        data.image = `${HOST}:${port}/public/${req.file.filename}`;
    }

    try {
        const photo = await prisma.photo.create({
            data,
        });
        res.status(200).send(photo);
    } catch (err) {
        if (req.file) {
            deletePic('public', req.file.filename);
        }
        errorHandler(err, req, res);
    }

}

const index = async (req, res) => {
    try {
        const where = {};
        const { available } = req.query;
        if (available === 'true') {
            where.available = true
        } else if (available === 'false') {
            where.available = false
        }

        const photos = await prisma.photo.findMany({
            where,
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
        });

        res.json({
            data: photos.map(photo => (photo)),
        });
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const show = async (req, res) => {

}

const update = async (req, res) => {

}

const destroy = async (req, res) => {

}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}