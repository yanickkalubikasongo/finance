require('dotenv').config();
const bodyParser = require('body-parser')
const {sequelize,Op,User} = require('../config/db');
const fs = require('fs/promises')
const utilisateurService = require('../services/utilisateur.service');

module.exports={
    accueil: async (req,res)=>{
       res.render('accueil');
    },
    ckeck_mdp: async (req,res)=>{
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                let bodyRequest  = req.body;
                if(bodyRequest.mdp == req.session.mdp) res.json({ result : true });
                else res.json({ result : false });
            }
            catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }
}
