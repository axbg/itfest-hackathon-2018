const sequelize = require('./db.js');

let User = sequelize.import('./user');
let Group = sequelize.import('./group');
let Class = sequelize.import('./class');
let Gradebook = sequelize.import('./gradebook');
let Material = sequelize.import('./material');
let Schedule = sequelize.import('./schedule');
let Announcement = sequelize.import('./announcement');
let Request = sequelize.import('./request');

Group.hasMany(Announcement, {as: 'Anouncements'});

Group.hasMany(User, {as: 'Users'});

Group.hasMany(Schedule, {as: 'Schedule'});

User.hasMany(Gradebook, {as: 'Gradebooks'});
Class.hasMany(Gradebook, {as: 'Gradebooks'});

Class.hasMany(Schedule, {as: 'Schedule'});

Schedule.hasMany(Material, {as: 'Materials'});

User.hasMany(Request, {as: 'Requests'});
Group.hasMany(Request, {as: 'Requests'});

//Exports
module.exports = {
	sequelize,
	User,
	Group,
	Class,
	Announcement,
	Schedule,
	Gradebook,
	Material,
	Request
};
