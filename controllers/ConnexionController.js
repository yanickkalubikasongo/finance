require('dotenv').config();
const bodyParser = require('body-parser')
const {sequelize} = require('../config/db');
const hopitalService = require('../services/hopital.service');
const dossierService = require('../services/dossier.service');
const droitService = require('../services/droit.service');
const utilisateurService = require('../services/utilisateur.service');
const roleService = require('../services/role.service');

module.exports={
    connexion_admin : async(req,res)=>{
        message = req.params.message
        res.render('Authentification/connexion_admin',{
            message
        });
    },
    changer_mdp: async (req, res)=> {
         try {
            let erreur = req.params.erreur
            if(erreur){
                res.render('Authentification/changement_mot_de_passe',{
                    erreur
                })
            }else res.render('Authentification/changement_mot_de_passe')
        } catch (error) {
            res.send('Erreur '+ error)
        }
    },
    enregistrer_changement_mdp: async (req, res)=> {
        try {
           let mdp_ancien = req.body.ancien_mdp,
               mdp_nouveau = req.body.nouveau_mdp,
               mdp_repete = req.body.repete_mdp,
               pseudo = req.body.pseudo,
               erreur = [],
               utilisateur = await utilisateurService.check_pseudo_and_mdp(pseudo,mdp_ancien)

            if(utilisateur =='') erreur.push('Mot de passe introuvable')
            if (mdp_nouveau != mdp_repete) erreur.push('Deux mot de passe non correspondants')
            if (mdp_ancien == mdp_nouveau)  erreur.push('Vous n\'avais pas changé de mot de passe')
            if(erreur != '') res.redirect('/changer_mdp/'+ erreur)
            else{
                await utilisateurService.modification_mdp(mdp_ancien,mdp_nouveau,pseudo)
                if(req.session.hp == '1') res.redirect('/deconnexion_admin')
                else res.redirect('/deconnexion')
            }
          } catch (error) {
            res.send('Erreur '+ error);
          }
    }
}
