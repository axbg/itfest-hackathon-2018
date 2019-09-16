const Announcement = require('../models').Announcement;
const findUser = require('./users').findUser;

module.exports.getAnnouncements = async (req, res) => {

    let usr = await findUser(req.session);

    Announcement.findAll({
        where:{
            group_id: usr.group_id
        }, 
        raw:true
    }).then((result) => {
        res.status(200).send(result);
    })
}

