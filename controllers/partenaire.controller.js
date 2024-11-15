require('dotenv').config();
const bodyParser         = require('body-parser')
const {sequelize}        = require('../config/db');
const partenaireServices = require('../services/partenaire.service');
const personnelServices  = require('../services/personnel.service');
const helperServices     = require('../helper/helper');

module.exports={
    enreg_partenaire: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {  
                let bodyRequest = req.body,
                    erreur=[],
                    msg = 'h',
                    file = ''
                        
                if(req.files) file = req.files.autorisation;
                else file = ''
            
                if(helperServices.presence(bodyRequest.denomination)) erreur.push('Merci de saisir la denomination')
                else{
                    if(helperServices.taille(bodyRequest.denomination,30)) erreur.push('La taille de la denomination doit être inférieure ou égale à 30')
                    else{
                        if(helperServices.content_letter(bodyRequest.denomination)) erreur.push('La denomination doit contenir au moins une lettre')
                        else{
                            if(helperServices.presence(bodyRequest.id_nat)) erreur.push('Merci de saisir l\'Identifiant National')
                            else{
                                if(helperServices.taille(bodyRequest.id_nat,25)) erreur.push('La taille de l\'Identifiant National doit être inférieure ou égale à 25')
                                else{
                                    if(helperServices.presence(bodyRequest.rccm_f)) erreur.push('Merci de saisir le RCCM')
                                    else{
                                        if(helperServices.taille(bodyRequest.rccm_f,25)) erreur.push('La taille du RCCM doit être inférieure ou égale à 25')
                                        else{
                                            if(helperServices.taille(bodyRequest.telephone,15)) erreur.push('Le numéro téléphonique doit être inférieur ou égal à 15')
                                            else{
                                                if(helperServices.presence(bodyRequest.telephone)) erreur.push('Merci de saisir le numéro téléphonique')
                                                else{
                                                    if(helperServices.presence(bodyRequest.email)) erreur.push('Merci de saisir l\'Adresse électronique')
                                                    else{
                                                        if(helperServices.email(bodyRequest.email)) erreur.push('Adresse électronique incorrecte')
                                                        else{
                                                            if(helperServices.presence(bodyRequest.adresse_physique)) erreur.push('Merci de saisir l\'adresse electronique')
                                                            else{
                                                                if(helperServices.taille(bodyRequest.adresse_physique,30)) erreur.push('La taille du l\'adresse physique doit être inférieure ou égale à 30')
                                                                else{
                                                                    if(helperServices.presence(bodyRequest.autorisation)) erreur.push('Merci d\'importer un document')  
                                                                    else{
                                                                        if(await partenaireServices.check_email_partenaire(bodyRequest.email) !='') erreur.push('Cette adresse électronique est déjà utilisé')  
                                                                        else{
                                                                            if(await partenaireServices.check_telephone_partenaire(bodyRequest.telephone) !='') erreur.push('Ce numéro de téléphone est déjà utilisé') 
                                                                            else{
                                                                                if(await partenaireServices.check_id_national_partenaire(bodyRequest.id_nat) !='') erreur.push('Ce ID national est déjà utilisé')
                                                                                else{
                                                                                    if(await partenaireServices.check_rccm_partenaire(bodyRequest.rccm_f) !='') erreur.push('Ce RCCM est déjà utilisé') 
                                                                                    else{
                                                                                        if(helperServices.valid_telephone(bodyRequest.telephone)) erreur.push('Ce numéro de téléphone est invalide')
                                                                                        else{
                                                                                            if(bodyRequest.id_gerant == '') erreur.push('L\'ID du gèrant n\'est pas renseigné. Merci de repondre l\'opération')
                                                                                        }
                                                                                    }
                                                                                } 
                                                                            } 
                                                                        }
                                                                    }  
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if(erreur==''){
                    res.json({
                        reponse: await partenaireServices.enregistrer_partenaire(req.body,file)
                    });
                }else{
                    res.json({
                        reponse: erreur
                    });
                }
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    find_organisation: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof  req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({
                    reponse: await partenaireServices.find_organisation(req.body)
                });
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    find_gerant: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({
                    reponse: await partenaireServices.find_gerant(req.body)
                });
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    find_user: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({
                    reponse: await partenaireServices.find_user(req.body)
                });
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    rep_partenaire: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({
                    rep: await partenaireServices.rep_part()
                });
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }
}
