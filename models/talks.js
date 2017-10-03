var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt-nodejs'); 
// bcrypt is used to encrpt a user passwords

var Sequelize = require("sequelize");
// sequelize is a constructor function, so must be refernced as a var, as seen below


//Setting up connecction with mysql and a new db
// var sequelize = new Sequelize('database_name', 'root', 'password');
var sequelize = new Sequelize('ted_talks_db', 'root', 'SR1024xo', {
    host: "localhost",
    dialect: 'mysql',
    pool:{
        max: 5,
        min: 0,
        idle: 1000
    } 
   
});


// now begin to define models using this connection object

// make a new table, using the 'define' function

var Talks = sequelize.define("talks", {
        
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    main_speaker: {
        type: Sequelize.STRING,
        allowNull: false
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    related_talks: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tags: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }

});
Talks.sequelize.sync({force:false}).then(function() {
   console.log("we made it");
});
