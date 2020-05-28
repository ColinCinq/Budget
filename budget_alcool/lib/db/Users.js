module.exports = (conn) => {
	return {
		isAlreadyExisting: (username) => {
			conn.query('SELECT COUNT(*) FROM Users WHERE username = ?', [username], function(err, rows, fields) {
    		    if (err) throw err
   			    if(rows.length ==0)
        		    return false
        		return true
    		})
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