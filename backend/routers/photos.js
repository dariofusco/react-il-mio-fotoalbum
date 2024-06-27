const express = require("express");
const router = express.Router();
const {
    store,
    index,
    show,
    update,
    destroy
} = require('../controllers/photos.js');
const authenticateToken = require('../middlewares/auth.js');
const multer = require("multer");
const path = require("path");
const validator = require('../middlewares/validator.js');
const { bodyData } = require('../validations/photos.js');

const storage = multer.diskStorage({
    destination: "public",
    filename: (req, file, cf) => {
        const fileType = path.extname(file.originalname);
        cf(null, String(Date.now()) + fileType)
    }
});

const upload = multer({ storage });

router.get('/', index);

router.get('/:id', show);

router.use(authenticateToken);

router.post('/', upload.single("image"), validator(bodyData), store);

router.put('/:id', upload.single("image"), validator(bodyData), update);

router.delete('/:id', destroy);

module.exports = router;