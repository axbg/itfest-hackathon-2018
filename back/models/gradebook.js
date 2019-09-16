module.exports = (sequelize, DataTypes) => {
	return sequelize.define("gradebook", {
		'score': DataTypes.STRING
	}, {
			underscored: true
		});
}