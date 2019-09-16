const express = require('express');
const router = express.Router();
const controller = require('../controllers/groups');
const middleware = require('../controllers/middlewares');

router.get('/', middleware.checkLogin, controller.getGroups);

router.post('/', middleware.checkLogin, controller.createGroup);

router.get('/request', middleware.checkLogin, middleware.checkAdmin, controller.getRequests);

router.post('/request', middleware.checkLogin, controller.createRequest);

router.post('/request/accept', middleware.checkLogin, middleware.checkAdmin, controller.acceptGroupRequest);

router.get('/exit', middleware.checkLogin, controller.exitGroup);

router.get('/expel', middleware.checkLogin, middleware.checkAdmin, controller.adminExitGroup);

router.get('/change/admin', middleware.checkAdmin, middleware.checkAdmin, controller.changeAdmin);

module.exports = router;