var mysql = require('mysql');
 
var conn = mysql.createConnection({
  database: 'colincinq_portfolio',
  host: "mysql-colincinq.alwaysdata.net",
  user: "colincinq_001",
  password: "2dadzEAxw@FpN8V"
});
  
conn.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected!");

    conn.query("SELECT * FROM job", function(err, rows, fields) {
        if (err) throw err;
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i]);
        }
    });
 
 //    // Drop EMPLOYEES table if Exists!!
 //    var sql1 = "DROP TABLE IF EXISTS job ";
 
 //    conn.query(sql1, function(err, results) {
 //        if (err) throw err;
 //        console.log("Table job dropped");
 //    });
 
 //    // Create EMPLOYEES Table.
 //    var sql2 = "CREATE TABLE `job` ("+
	// "`id` INT NOT NULL AUTO_INCREMENT,"+
	// "`entreprise` VARCHAR(25),"+
	// "`poste` VARCHAR(30),"+
	// "`date` VARCHAR(20),"+
	// "`description` VARCHAR(255),"+
	// "PRIMARY KEY (`id`))";
 
 //    conn.query(sql2, function(err, results) {
 //        if (err) throw err;
 //        console.log("Table job created");
 //    });
 
 //    var entreprise = ["Axolotech", "Infocosme", "BDE Info"];
 //    var poste = ["stagiaire full stack", "alternant dev web", "Responsable K’fet"];
 //    var date = ["avril-juin 2019", "septembre 2019", "mars 2018-mars 2019"];
 //    var description = ["Création d’une application d’animation de stand lors de salon en Java sur Raspberry Pi. Création de fonctionnalités pour la plateforme web d’un produit en JavaScript, HTML, CSS et PHP.",
 //    				   "Développement d’un ERP en ligne en XPX, création de nouvelle fonctionnalité, répondre à des demandes clients, support technique", 
 //    				   "Gestion d’équipe, maintient de stocks, gestion de rentabilité du service de restauration proposé aux étudiants. Organisation de divers évènements pour les étudiants."];
 
 //    // Insert Datas to EMPLOYEES.
 //    for (var i = 0; i < poste.length; i++) {
 //        var sql3 = "Insert into job (entreprise, poste, date, description) " //
 //            +
 //            " Values ('" + entreprise[i] + "', '" + poste[i] + "', '" + date[i] + "', '" + description[i] + "')";
 
 //        conn.query(sql3, function(err, results) {
 //            if (err) throw err;
 //            console.log(sql3);
 //        });
 //    }
 
});