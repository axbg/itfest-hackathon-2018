module.exports = (sequelize, DataTypes) => {
	return sequelize.define("material", {
        'type': DataTypes.STRING,
        'date': DataTypes.STRING,
        'hour': DataTypes.STRING,
        'approved': {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
			underscored: true
		});
}