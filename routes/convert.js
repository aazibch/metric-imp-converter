const express = require('express');
const router = express.Router();

const convertController = require('../controllers/convert');

router.get('/', convertController.convert_get);

module.exports = router;