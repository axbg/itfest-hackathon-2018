module.exports = (sequelize, DataTypes) => {
	return sequelize.define("class", {
		'name': DataTypes.STRING,
	}, {
			underscored: true
		});
}