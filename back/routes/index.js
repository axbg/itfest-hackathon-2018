const express = require('express');
const middleware = require('../controllers/middlewares');
const router = express.Router();
const userRouter = require('./user.js');
const groupRouter = require('./group.js');
const classRouter = require('./class.js');
const announcementRouter = require('./announcements.js');
const materialRouter = require('./materials.js');
const scheduleRouter = require('./schedule.js');

router.use("/user", userRouter);
router.use('/group', groupRouter);
router.use("/class", classRouter);
router.use('/announcements', announcementRouter);
router.use('/schedule', scheduleRouter);
router.use('/material', materialRouter);
router.post('/login', middleware.login);


//Home page
router.get('/', function (req, res, next) {
  res.status(200).send("Neverlate - your loyal informer!");
});

module.exports = router;
