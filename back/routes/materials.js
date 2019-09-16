const express = require('express');
const router = express.Router();
const controller = require('../controllers/materials');
const middleware = require('../controllers/middlewares');

router.get('/', controller.getMaterials);

module.exports = router;