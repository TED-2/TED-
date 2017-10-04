var express = require("express");
var bodyParser = require("body-parser");


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

var Transcripts = sequelize.define("transcripts", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
        
   transcript: {
        type: Sequelize.TEXT,
        allowNull: false
    },
   
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }

},
{
    timestamps: false
});
Transcripts.sequelize.sync({force:false}).then(function() {
   console.log("we made it");
});
