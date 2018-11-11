const express = require('express');
const router = express.Router();
const controller = require('../controllers/schedule');
const middleware = require('../controllers/middlewares');

router.get('/', controller.getSchedule);
router.get('/:classId', controller.getScheduleClass);
router.post('/', middleware.checkLogin, middleware.checkAdmin, controller.createSchedule);
router.post('/edit', middleware.checkLogin, middleware.checkAdmin, controller.editSchedule);
router.post('/delete', middleware.checkLogin, middleware.checkAdmin, controller.deleteSchedule);

module.exports = router;