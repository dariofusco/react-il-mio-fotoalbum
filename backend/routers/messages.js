const express = require("express");
const router = express.Router();
const {
    store,
    index,
    show,
    destroy
} = require('../controllers/messages.js');
const { bodyData } = require('../validations/messages.js');
const validator = require('../middlewares/validator.js');

router.post('/', validator(bodyData), store);

router.get('/', index);

router.get('/:id', show);

router.delete('/:id', destroy);

module.exports = router;