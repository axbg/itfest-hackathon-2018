const User = require('../models').User;
const mailer = require('./utils/helpers');
const md5 = require('js-md5');

module.exports.getUsers = (req, res) => {
    User.findAll({
        raw:true
    }).then((result) => {
        res.status(200).send(result);
    })
}

module.exports.createUsers = async (req, res) => {

    let found = await User.findOne({
        where:{
            email: req.body.email
        }
    });

    if(found){
        res.status(400).send({message:"This email is already registered"});
    } else {

        let uid = parseInt(Math.random()*1000000000);

        User.create(
            { 
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: md5(req.body.password),
                groupId: null,
                isActive: uid,
                token: uid
            }
        ).then((result) => {
            let link = "http://localhost:3005/user/activate?token=" + result.isActive;
            let content = "To activate your account you have to click on this link: " + link;

            mailer.sendMail(req.body.email, content);

            res.status(200).send({message: "Congrats " + result.firstname + "! You were registered"});
        }).catch((err) => {
            res.status(500).send({message: "Something happened"});
        });
    }

}

module.exports.activateUser = (req, res) => {

    User.findOne({
        where:{
            isActive: req.query.token
        }
    }).then((result) => {
        result.isActive = 1;
        result.save();
        res.status(200).send("Your account was activated");
    }).catch(err => {
        res.status(400).send({message: "Token is not valid!"});
    })

}

module.exports.groupUsers = async (req, res) => {

    let usr = await finddUser(req.session);

    User.findAll({
        where:{
         group_id: usr.group_id   
        },
        raw:true,
        attributes: ['firstname', 'lastname', 'email']
    }).then(result => {
        res.status(200).send(result);
    })
}

//services
module.exports.findUser = async(session) => {

    let user = await User.findOne({
        where:{
            token: session.token
        }, 
    });

    return user;
}

let finddUser = async(session) => {

    let user = await User.findOne({
        where:{
            token: session.token
        }, 
    });

    return user;
}