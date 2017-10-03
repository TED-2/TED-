'use strict';
const UserModel = require( './user' );

const path = require( 'path' );
const Sequelize = require( 'sequelize' );
const env = process.env.NODE_ENV || 'development';
const config = require( path.join( __dirname, '/../config/config.json' ) )[env];
const bcrypt = require( 'bcrypt' );

let sequelize = null;
let db = {};

/**
 * Setup Sequalize
 */
if ( config.use_env_variable ) {
    sequelize = new Sequelize( process.env[config.use_env_variable] );
} else {
    sequelize = new Sequelize( config.database, config.username, config.password, config );
}

/**
 * Define the users table
 */
const User = sequelize.define( 'users', UserModel, {
    'hooks': {
        'beforeCreate': ( user ) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync( user.password, salt );
        }
    },
    'instanceMethods': {
        'validPassword': function ( password, user ) {
            return bcrypt.compareSync( password, user.password );
        }
    }
} );

/**
 * Add User model to the db export
 */
db['User'] = User;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
