const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const middleware = require('../controllers/middlewares');

router.get('/', controller.getUsers);
router.get('/activate', controller.activateUser);
router.get('/group', middleware.checkLogin, controller.groupUsers);

router.post('/', controller.createUsers);




module.exports = router;