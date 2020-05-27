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
			conn.query('INSERT INTO Users (username, password) VALUES ("?", PASSWORD("?"))',[username,password], function(err, rows, fields) {
				if (err) throw err
				return true
			})
		},

		login: (username,password) => {
			conn.query('SELECT id FROM Users WHERE username = "?", password=PASSWORD("?"))',[username,password], function(err, rows, fields) {
				if (err) throw err
				if(rows.length == 0)
					return false
				return rows.id
			})
		},

	}
}