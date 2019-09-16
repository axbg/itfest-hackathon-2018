const Schedule = require('../models').Schedule;
const Group = require('../models').Group;
const Class = require('../models').Class;
const Material = require('../models').Material;
const findUser = require('./users').findUser;

module.exports.getMaterials = async (req, res) => {

    let usr = await findUser(req.session);

    let schedules = await Schedule.findAll({
        where:{
            group_id: usr.group_id
        }, raw:true
    });

    let arr = [];
    let newObj = {};

    for(let i=0; i<schedules.length; i++){
       
        let className = await Class.findOne({
            where: {
                id: schedules[i].class_id
            },
            attributes: ['name'],
            raw: true
        })

        let materials = await Material.findAll({
            where:{
               schedule_id: schedules[i].id 
            },
        });

        materials.forEach(material => {
            newObj = { ...schedules[i].name, ...className, material};
            arr.push(newObj);
        })

    }
    res.status(200).send(arr);
}