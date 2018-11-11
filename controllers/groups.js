const Group = require('../models').Group;
const Request = require('../models').Request;
const findUser = require('./users').findUser;
const User = require('../models').User;

module.exports.getGroups = (req, res) => {
    Group.findAll({
        raw: true
    }).then((result) => {
        res.status(200).send(result);
    });
}

module.exports.createGroup = async (req, res) => {

    let cUser = await findUser(req.session);

    if (cUser.group_id) {
        res.status(403).send({ message: "You are already member of a group" });
    } else {
        Group.create({
            name: req.body.name,
            year: req.body.year,
            groupLeader: cUser.id
        }).then((result) => {

            req.session.isLeader = 1;

            cUser.group_id = result.id;
            cUser.save();

            res.status(200).send({ message: "Group " + result.name + " was created successfuly!" });
        }).catch((err) => {
            res.status(400).send({ message: "Something happened" });
        })
    }

}

module.exports.createRequest = async (req, res) => {

    let cUser = await findUser(req.session);

    if (cUser.group_id) {
        res.status(403).send({ message: "You are already member of a group" });
    } else {

        Group.findOne({
            where: {
                id: req.body.groupId
            }
        }).then((result) => {
            Request.create({
                group_id: req.body.groupId,
                user_id: cUser.id
            }).then((result) => {
                res.status(200).send({ message: "Your request was submitted" });
            })
        }).catch(err => {
            res.status(400).send({ message: "Something happened" });
        })
    }
}

module.exports.getRequests = async (req, res) => {

    let cUser = await findUser(req.session);

    if (req.session.isLeader) {
        Request.findAll({
            where: {
                group_id: cUser.group_id
            },
            raw:true
        }).then( async (result) => {

            let arr = [];
            let obj = {};


            for(let i=0; i<result.length;i++){

                let usr = await User.findOne({
                    where:{
                        id: result[i].user_id
                    }, 
                    attributes: ['firstname', 'lastname', 'email'],
                    raw:true
                });

                obj = {...result[i], ...usr}
                arr.push(obj);
            }

            res.status(200).send(arr);
           
        }).catch((err) => {
            res.status(400).send(err.message);
        })
    }
    else {
        res.status(403).send({ message: "Forbbidden" });
    }
}

module.exports.acceptGroupRequest = async (req, res) => {

    Request.findOne({
        where: {
            user_id: req.body.userId
        }
    }).then(async (result) => {

        if (result) {
            let usr = await User.findOne({
                where: {
                    id: result.user_id
                }
            });

            usr.group_id = result.group_id;
            usr.save();

            Request.findAll({
                where: {
                    user_id: usr.id
                }
            }).then((result) => {

                if (Array.isArray(result)) {

                    for (let i = 0; i < result.length; i++) {
                        result[i].destroy();
                    }

                } else {
                    result.destroy();
                }

                res.status(200).send({ message: "User was accepted in your group" });
            }).catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
        } else {
            res.status(200).send({ message: "No requests for this user" });
        }
    });
}

module.exports.exitGroup = (req, res) => {

    if (!req.session.isLeader) {
        User.findOne({
            where: {
                token: req.session.token
            }
        }).then((result) => {
            result.group_id = null;
            result.save();

            res.status(200).send({ message: "You exited your group" });
        })
    } else {
        res.status(400).send({ message: "You are a group leader. Choose another group leader then leave!" });
    }
}

module.exports.adminExitGroup = (req, res) => {
    User.findOne({
        where: {
            id: req.body.userId
        }
    }).then((result) => {
        result.group_id = null;
        result.save();

        res.status(200).send({ message: "You expelled " + result.firstname });
    })
}


module.exports.changeAdmin = (req, res) => {

    Group.findOne({
        where: {
            id: group_id
        }
    }).then((result) => {
        result.groupLeader = req.body.userId
        result.save();

        res.status(200).send({ message: "You are no longer a team leader!" });
    })
}
