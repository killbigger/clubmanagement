var mysql = require('mysql');
require('dotenv').config()



    var connection = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: "cms"
      });
      
      connection.connect(function(err) {
        if (err) throw err;
        console.log("MySql Connected!");
      });


module.exports = connection;
