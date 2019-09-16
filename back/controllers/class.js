const Class = require('../models').Class;

module.exports.getClass = (req, res) => {
    Class.findAll()
    .then(result => {
        res.status(200).send(result);
    });
}

module.exports.createClass = (req, res) => {
    Class.create({
        name: req.body.name
    })
    .then((result) => {
        req.status(200).send({message: "Class was added"});
    })
}
