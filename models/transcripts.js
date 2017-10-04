const Sequelize = require( 'sequelize' );

const Transcripts = {
    'id': {
        'type': Sequelize.INTEGER,
        'autoIncrement': true,
        'primaryKey': true
    },

    'transcript': {
        'type': Sequelize.TEXT,
        'allowNull': false
    },

    'url': {
        'type': Sequelize.STRING,
        'allowNull': false
    }

};

module.exports = Transcripts;
