const express = require('express');
const router = express.Router();
const controller = require('../controllers/announcements');
const middleware = require('../controllers/middlewares');

router.get('/', middleware.checkLogin, controller.getAnnouncements);



module.exports = router;