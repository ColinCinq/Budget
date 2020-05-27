var mysql = require('mysql')

var conn = mysql.createConnection({
  database: 'budget',
  host: "localhost",
  user: "root",
  password: ""
})
conn.connect(function(err) {
    if (err){
        throw err;
    }
})

require('./Users')(conn)

module.exports.MyModel = model;
