module.exports = (conn) => {
	return {
<<<<<<< HEAD
		isAlreadyExisting: (username) => {
			conn.query('SELECT COUNT(*) FROM Users WHERE username = ?', [username], function(err, rows, fields) {
    		    if (err) throw err
   			    if(rows.length ==0)
        		    return false
        		return true
    		})
=======
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
>>>>>>> color picker bugfix code clean global et debut ecran setup/alcohol
		},

		register: (username,password) => {
			conn.query('INSERT INTO Users (username, password) VALUES (?, PASSWORD(?))',[username,password], function(err, rows, fields) {
				if (err) throw err
				return true
			})
		},

		login: (username,password) => {
			console.log(username)
			console.log(password)
			conn.query('SELECT username FROM Users WHERE username = ? AND password=PASSWORD(?)',[username,password], function(err, rows, fields) {
				if (err) throw err
				if(rows.length == undefined)
					return false
				return rows.username
			})
		},

	}
}