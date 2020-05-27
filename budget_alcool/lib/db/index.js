var mysql = require('mysql')

var conn = mysql.createConnection({
  database: 'budget',
  host: "localhost",
  user: "root",
  password: ""
})
conn.connect(function(err) {
    if (err) throw err;
})

module.exports = {
	Users: require('./Users')(conn)
}
