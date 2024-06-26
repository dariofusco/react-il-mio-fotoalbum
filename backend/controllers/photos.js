const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const errorHandler = require("../middlewares/errorHandler.js");
const deleteImage = require("../utils/deleteImage.js");

const store = async (req, res) => {

    const { title, description, categories, visible } = req.body;

    const data = {
        title,
        description,
        visible,
        categories: {
            connect: categories.map(category => ({ id: Number(category) }))
        }
    }

    if (req.file) {
        data.image = req.file.filename;
    }

    try {
        const photo = await prisma.photo.create({ data });
        res.status(200).send(photo);
    } catch (err) {
        if (req.file) {
            deleteImage(req.file.filename);
        }
        errorHandler(err, req, res);
    }
}

const index = async (req, res) => {
    try {
        const where = {};
        const { visible } = req.query;
        if (visible === 'true') {
            where.visible = true
        } else if (visible === 'false') {
            where.visible = false
        }

        const photos = await prisma.photo.findMany({
            where,
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        res.json({
            data: photos.map(photo => (photo)),
        });
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const photo = await prisma.photo.findUnique({
            where: { id },
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        if (photo) {
            res.json(photo);
        } else {
            res.status(404).json(`Foto con id ${id} non trovata.`);
        }
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, categories, visible } = req.body;

        const data = {
            title,
            description,
            visible,
            categories: {
                set: categories.map(id => ({ id }))
            }
        }

        if (req.file) {
            data.image = req.file.filename;
        }

        const photo = await prisma.photo.update({
            where: { id: parseInt(id) },
            data,
        });
        res.json(photo);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const photoDeleted = await prisma.photo.delete({
            where: { id: parseInt(id) },
        });
        deleteImage(photoDeleted.image)
        res.json(`Foto con id ${id} eliminata con successo.`);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}