const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const generateToken = require("../utils/generateToken.js");
const { hashPassword, comparePassword } = require("../utils/password.js");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const data = {
            name,
            email,
            password: await hashPassword(password),
        }

        const user = await prisma.user.create({ data });

        const token = generateToken({
            email: user.email,
            name: user.name,
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user });

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).send('Credenziali errate.');
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).send('Credenziali errate.');
        }

        const token = generateToken({
            name: user.name,
            email: user.email,
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user });

    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    register,
    login,
}