
module.exports = function(sequelize, DataTypes) {
	var Talk = sequelize.define("Talks", {
		comments: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		event: {
			type: DataTypes.STRING,
			allowNull: false
		},
		film_date: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		languages: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		main_speaker: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		num_speaker: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		published_date: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ratings: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		related_talks: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		speaker_occupation: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		tags: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		views: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
	return Talk;
};