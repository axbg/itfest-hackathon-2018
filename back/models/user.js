module.exports = (sequelize, DataTypes) => {
	return sequelize.define("user", {
		'firstname': DataTypes.STRING,
        'lastname': DataTypes.STRING,
		'email': DataTypes.STRING,
		'password': DataTypes.STRING,
		'isActive': DataTypes.INTEGER,
		'token': DataTypes.STRING
	}, {
			underscored: true
		});
}