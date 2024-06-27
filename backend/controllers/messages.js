const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const errorHandler = require("../middlewares/errorHandler.js");

const store = async (req, res) => {
    const { email, content } = req.body;

    const data = { email, content }

    try {
        const message = await prisma.message.create({ data });
        res.status(200).send(message);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const index = async (req, res) => {
    try {
        const messages = await prisma.message.findMany();
        res.json(messages);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const message = await prisma.message.findUnique({
            where: { id }
        });
        if (message) {
            res.json(message);
        } else {
            res.json(`Messaggio con id ${id} non trovata.`);
        }
    } catch (err) {
        errorHandler(err, req, res);
    }
}

const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.message.delete({
            where: { id },
        });
        res.json(`Messaggio con id ${id} eliminato con successo.`);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    store,
    index,
    show,
    destroy
}