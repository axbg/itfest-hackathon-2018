const express = require('express');
const router = express.Router();
const controller = require('../controllers/class');
const middleware = require('../controllers/middlewares');

router.get('/', middleware.checkLogin, controller.getClass);

router.post('/', middleware.checkLogin, controller.createClass);


module.exports = router;