module.exports = (sequelize, DataTypes) => {
	return sequelize.define("announcement", {
		'content': DataTypes.STRING,
	}, {
			underscored: true
		});
}