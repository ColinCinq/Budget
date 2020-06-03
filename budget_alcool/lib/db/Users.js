module.exports = function (conn) {
	return {
		isAlreadyExisting: function (username, email, callback) {
			let ret = {username: true, email: true}
			conn.query('SELECT COUNT(*) AS tmp FROM Users WHERE username = ?', [username], function(err, rows, fields) {
				if (err) throw err
				if(rows[0].tmp == 0)
					ret.username = false

				conn.query('SELECT COUNT(*) AS tmp FROM Users WHERE email = ?', [email], function(err, rows, fields) {
					if (err) throw err
					if(rows[0].tmp == 0)
						ret.email = false

					return callback(null, ret)
				})
			})
		},

		register: function (username, password, email, callback) {
			conn.query('INSERT INTO Users (username, password, email) VALUES (?, PASSWORD(?), ?)',[username,password,email], function(err, rows, fields) {
				if (err) throw err
				return callback(null, true)
			})
		},

		login: function (username,password, callback) {
			conn.query('SELECT username FROM Users WHERE username = ? AND password=PASSWORD(?)',[username,password], function(err, rows, fields) {
				if (err) throw err
				if(rows.length === 0)
					return callback(null, false)
				else
					return callback(null, rows.username)
			})
		}
	}
}