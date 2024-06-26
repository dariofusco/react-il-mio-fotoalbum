const express = require("express");
const app = express();
const photosRouter = require("./routers/photos.js");
const categoriesRouter = require("./routers/categories.js");
const authRouter = require("./routers/auth.js");
const errorHandler = require("./middlewares/errorHandler.js");
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;
const cors = require("cors");

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use('/auth', authRouter);

app.use('/photos', photosRouter);

app.use('/categories', categoriesRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server attivo su ${HOST}:${port}`);
});