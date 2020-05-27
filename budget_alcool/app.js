
var twig = require('twig')
  , mysql = require('mysql')
  , express = require('express')
  , bodyParser = require('body-parser')

var app = express()
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

// Créer un port Dynamique (pour le localhost ou la version en ligne)
app.set('port', process.env.PORT || 3000)
console.log( app.settings.port )

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

// Routes de l'applications :
app.post('/', routes.index)
exports.index = function(req, res){
    res.render("index.twig")
};
app.post('/login')

app.get('/experiences', function(req, res){
    conn.query("SELECT * FROM job", function(err, rows, fields) {
        if (err){
            throw err;
        }
        console.log(rows)
        res.render("experiences.twig", { rows : rows } ); 
    })
})


// Autres routes = erreur 404 :
app.get('*', function(req, res){
    res.send("<h1>404</h1>")
})
// Ecoute le port Dynamique :
app.listen( app.settings.port ) 