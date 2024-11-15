require('dotenv').config();

const express        = require('express');
const cors           = require('cors');
const app            = express();
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const session 	     = require('express-session');
const fileUpload     = require('express-fileupload');
const compression    = require('compression');

const Sequelize     = require('sequelize')
// initalize sequelize with session store
var SequelizeStore  = require('connect-session-sequelize')(session.Store);

app.set('view engine', 'ejs');
app.set('views', './views');

/*
* Définition de fichiers static
*/ 

app.use('/static',express.static('public'));
/*
* Configuration des requêtes en dehors du domaine                                                      
*/     

const corsOptions = {
    origin:'',
    optionSuccessStatus:200
};
   
app.use(cors());
app.use(compression());
               
/*
* Configuration des paramètres express                                                      
*/                    

app.use(express.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

var sequelize = new Sequelize(
    "loanme",
    "root",
    "", {
        "dialect": "mysql",
        "storage": "./session.mysql"
    });
   
app.use(session({
    store: new SequelizeStore({
      db: sequelize
    }),
    saveUninitialized : false,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    secret: "hlskjdhlksjhdlkshkdjsdhlsdz45465",
    cookie: { maxAge: 86400000 } // 24h
}))

/*
* Initialisation des routes                                                 
*/  

app.use('/',require('./routes/home.route'));
app.use('/utilisateur',require('./routes/utilisateur.route'));

app.use('/personnel',require('./routes/personnel.route'));
app.use('/partenaire',require('./routes/partenaire.route'));
app.use('/adherent',require('./routes/adherent.route'));
app.use('/agence',require('./routes/agence.route'));


/*
* Lancement du serveur                                                   
*/  

app.listen(8000 || process.port,()=>{
    console.log('Application lancée');
});

