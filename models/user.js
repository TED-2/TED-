const Sequelize = require( 'sequelize' );

/**
 * Define the user model
 */
let user = {
    'email': {
        'type': Sequelize.STRING,
        'unique': true,
        'allowNull': false
    },
    'password': {
        'type': Sequelize.STRING,
        'allowNull': false
    }
};

module.exports = user;
