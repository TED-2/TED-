const Sequelize = require( 'sequelize' );

/**
 * Set up the table framework for the database
 */
const Talks = {
    'id': {
        'type': Sequelize.INTEGER,
        'autoIncrement': true,
        'primaryKey': true
    },
    'description': {
        'type': Sequelize.TEXT,
        'allowNull': false
    },
    'main_speaker': {
        'type': Sequelize.STRING,
        'allowNull': false
    },
    'name': {
        'type': Sequelize.STRING,
        'allowNull': false
    },
    'related_talks': {
        'type': Sequelize.TEXT,
        'allowNull': false
    },
    'tags': {
        'type': Sequelize.TEXT,
        'allowNull': false
    },
    'title': {
        'type': Sequelize.STRING,
        'allowNull': false
    },
    'url': {
        'type': Sequelize.TEXT,
        'allowNull': false
    },
    'view': {
        'type': Sequelize.INTEGER,
        'allowNull': false
    }
};

module.exports = Talks;
