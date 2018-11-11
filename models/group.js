module.exports = (sequelize, DataTypes) => {
	return sequelize.define("group", {
		'name': DataTypes.STRING,
		'year': DataTypes.STRING,
		'groupLeader': DataTypes.INTEGER
	}, {
			underscored: true
		});
}