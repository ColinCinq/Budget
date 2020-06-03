var mysql = require('mysql')

var conn = mysql.createConnection({
})
conn.connect(function(err) {
	if (err) throw err;
})

module.exports = {
	Users: require('./Users')(conn)
}
