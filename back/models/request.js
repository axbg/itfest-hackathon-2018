module.exports = (sequelize, DataTypes) => {
	return sequelize.define("request", {
        'approved': {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
			underscored: true
		});
}