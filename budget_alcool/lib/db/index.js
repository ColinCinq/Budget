var mysql = require('mysql')

var conn = mysql.createConnection({
	database: 'colincinq_cocktail_budget',
	host: "mysql-colincinq.alwaysdata.net",
	user: "colincinq_001",
	password: "2dadzEAxw@FpN8V"
})
conn.connect(function(err) {
	if (err) throw err;
})

module.exports = {
	Users: require('./Users')(conn)
}
