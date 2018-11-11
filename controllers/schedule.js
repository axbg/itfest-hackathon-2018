const Schedule = require('../models').Schedule;
const Group = require('../models').Group;
const Class = require('../models').Class;
const findUser = require('./users').findUser;

module.exports.getSchedule = async (req, res) => {

    let usr = await findUser(req.session);

    let grp = await Group.findOne({
        where: {
            id: usr.group_id
        }
    })

    grp.getSchedule({ raw: true })
        .then(async (result) => {

            //res.status(200).send(result);
            let newObj = {};
            let arr = [];

            for (let i = 0; i < result.length; i++) {
                let className = await Class.findOne({
                    where: {
                        id: result[i].class_id
                    },
                    attributes: ['name'],
                    raw: true
                })

                newObj = { ...result[i], ...className };
                arr.push(newObj);
            }

            res.status(200).send(arr);

        })
}

module.exports.getScheduleClass = async (req, res) => {

    Schedule.findAll({
        where: {
            class_id: req.params.classId
        },
        raw:true
    }).then( async (result) => {

        let newObj = {};
        let arr = [];

        for (let i = 0; i < result.length; i++) {
            let className = await Class.findOne({
                where: {
                    id: req.params.classId
                },
                attributes: ['name'],
                raw: true
            })

            newObj = { ...result[i], ...className };
            arr.push(newObj);
        }

        res.status(200).send(arr);
    });
}

module.exports.createSchedule = async (req, res) => {

    let usr = await findUser(req.session);

    Schedule.create({
        day: req.body.day,
        hour: req.body.hour,
        class_id: req.body.classId,
        group_id: usr.group_id
    }).then((result) => {
        res.status(200).send({ message: "Schedule created" });
    })
}

module.exports.editSchedule = (req, res) => {

    Schedule.findOne({
        where: {
            id: req.body.scheduleId
        }
    }).then((result) => {

        if (req.body.day) {
            result.day = req.body.day;
        }

        if (req.body.hour) {
            result.hour = req.body.hour;
        }

        result.save();

        res.status(200).send({ message: "Schedule updated!" });

    })
}

module.exports.deleteSchedule = (req, res) => {
    Schedule.findOne({
        where: {
            id: req.body.scheduleId
        }
    }).then((result) => {
        result.destroy();
        res.status(200).send({ message: "Schedule deleted!" });
    })
}