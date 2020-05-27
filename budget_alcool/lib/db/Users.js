var mysql = require('mysql')

module.exports = function (conn) {
	return {
		isExisting: (username) => {
			conn.query('SELECT COUNT(*) FROM Users WHERE username = ?', [username], function(err, rows, fields) {
    		    if (err) throw err;
   			    for (var i = 0; i < rows.length; i++) {
        		    console.log(rows[i])
        		}
    		})
		}

	}
}