const User = require('../models').User;
const Group = require('../models').Group;
const md5 = require('js-md5');


module.exports.login = async (req, res) => {

    User.findOne({
        where:{
            email: req.body.email,
            password: md5(req.body.password)
        }
    }).then(async (result) => {
        if(result && result.isActive === 1){
            
            req.session.token = result.token;
            req.session.id = result.id;
            
            let hisGroup = await Group.findOne({
                where:{
                    groupLeader: result.id
                }
            });

            if(hisGroup){
                req.session.isLeader = 1;
                res.status(200).send({group: result.group_id, isAdmin:"1"});
            } else {
                res.status(200).send({group: result.group_id, isAdmin:"0"});
            }

        } else {
            res.status(400).send({message: "Your credentials are not correct"});
        }
    }).catch((err) => {
        res.status(400).send({message: "An error occured"});
    })
};

module.exports.checkLogin = (req, res, next) => {

    User.findOne({
        where:{
            token: req.session.token
        }
    }).then((result) => {
        if(result){
            next();
        } else{
            res.status(403).send({message: "Forbbidden"});
        }
    })
};

module.exports.checkAdmin = (req, res, next) => {
    User.findOne({
        where:{
            token: req.session.token
        }
    }).then((result) => {
        if(req.session.isLeader){
            next();
        } else{
            res.status(403).send({message: "Forbbidden"});
        }
    })
}