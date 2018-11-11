const Sequelize = require('sequelize');
const sequelize = new Sequelize('neverlate', 'root', '', {
	dialect: 'mysql',
	host: 'localhost',
	charset: 'utf8',
	collate: 'utf8_unicode_ci',
	define: {
		timestamps: false
	}
});

module.exports = sequelize;
