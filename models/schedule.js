module.exports = (sequelize, DataTypes) => {
	return sequelize.define("schedule", {
		'day': DataTypes.STRING,
        'hour': DataTypes.STRING
	}, {
			underscored: true
		});
}