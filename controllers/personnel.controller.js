require('dotenv').config();
const bodyParser = require('body-parser')
const {sequelize} = require('../config/db');
const personnelServices = require('../services/personnel.service');
const helperServices = require('../helper/helper');

module.exports={
    profil_user: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {

                let dataRequest = req.body,
                    erreur=[]
                
                if(helperServices.presence(dataRequest.adresse_electronique)) erreur.push('Merci de saisir l\'adresse électronique')
                else{
                    if(helperServices.presence(dataRequest.adresse_physique)) erreur.push('Merci de saisir l\'adresse physique')
                    else{
                        if(helperServices.presence(dataRequest.telephone)) erreur.push('Merci de saisir le numéro de téléphone')
                        else{
                            if(helperServices.email(dataRequest.adresse_electronique) ) erreur.push('L\'adresse électronique saisie est incorrecte')
                            else{
                                if(await personnelServices.check_email_profil(dataRequest.adresse_electronique,req.session.id_compte) !='') erreur.push('L\'adresse électronique saisie existe déjà')
                                else{
                                    if(await personnelServices.check_telephone_profil(dataRequest.telephone,req.session.id_compte) !='') erreur.push('Le numéro de téléphone saisi existe déjà')
                                    else{
                                        if(helperServices.valid_telephone(dataRequest.telephone) !='') erreur.push('Le numéro de téléphone doit être saisi sous format +243XXXXXXXXXXX')
                                    }
                                }
                            }
                        }
                    }
                }
                
                res.json({
                    result:  erreur == '' ? await personnelServices.update_profil_user(dataRequest,req.session.id_compte) : erreur
                });
            
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    enreg_personnel: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                let file = ''
                
                if(req.files) file = req.files.photo;
                else file = ''
                
                let dataRequest = req.body,
                    erreur=[]

                if(helperServices.presence(dataRequest.prenom)) erreur.push('Merci de remplir le champ Prénom')
                else{
                    if(helperServices.taille(dataRequest.prenom,15)) erreur.push('La taille du prénom doit être inférieure ou égale à 15')
                    else{
                        if(helperServices.letter_beginning(dataRequest.prenom)) erreur.push('Le prénom doit commencer par une lettre')
                        else{
                            if(helperServices.letter_beginning(dataRequest.nom)) erreur.push('Le nom doit commencer par une lettre')
                            else{
                                if(helperServices.presence(dataRequest.nom)) erreur.push('Merci de remplir le champ Nom')
                                else{
                                    if(helperServices.taille(dataRequest.nom,15)) erreur.push('La taille du prénom doit être inférieure ou égale à 15')
                                    else{
                                        if(helperServices.presence(dataRequest.type_membre)) erreur.push('Merci de choisir un Type de membre')
                                        else{
                                            if(helperServices.letter_beginning(dataRequest.postnom)) erreur.push('Le postnom doit commencer par une lettre')
                                            else{
                                                if(helperServices.taille(dataRequest.postnom,15)) erreur.push('La taille du postnom doit être inférieure ou égale à 15')
                                                else{
                                                    if(helperServices.presence(dataRequest.postnom)) erreur.push('Merci de remplir le champ Postnom')
                                                    else{
                                                        if(helperServices.presence(dataRequest.province)) erreur.push('Merci de choisir une Province')
                                                        else{
                                                            if(helperServices.presence(dataRequest.sexe)) erreur.push('Merci de choisir un Sexe')
                                                            else{
                                                                if(helperServices.presence(dataRequest.adresse)) erreur.push('Merci de remplir le champ Adresse')
                                                                else{
                                                                    if(helperServices.taille(dataRequest.adresse,30)) erreur.push('La taille de l\'adresse doit être inférieure ou égale à 30')
                                                                    else{
                                                                        if(helperServices.presence(dataRequest.date_naissance)) erreur.push('Merci de remplir le champ Date de naissance')
                                                                        else{
                                                                            if(helperServices.presence(dataRequest.telephone)) erreur.push('Merci de remplir le champ Téléphone')    
                                                                            else{
                                                                                if(helperServices.presence(dataRequest.email)) erreur.push('Merci de remplir le champ Adresse Electronique')
                                                                                else{
                                                                                    if(helperServices.email(dataRequest.email)) erreur.push('Adresse Electronique incorrecte') 
                                                                                    else{
                                                                                        if(helperServices.date_valid(dataRequest.date_naissance)) erreur.push('L\'utilisateur est mineur')     
                                                                                        else{
                                                                                            if(helperServices.presence(dataRequest.lieu_naissance)) erreur.push('Merci de remplir le champ Lieu de naissance')
                                                                                            else{
                                                                                                if(helperServices.taille(dataRequest.lieu_naissance,15)) erreur.push('Le champ Lieu de naissance doit avoir une taille inférieure ou égale à 15')
                                                                                                else{
                                                                                                    if(helperServices.letter_beginning(dataRequest.lieu_naissance)) erreur.push('Le lieu de naissance doit commencer par une lettre')
                                                                                                    else{
                                                                                                        if(helperServices.presence(dataRequest.agence) && dataRequest.type_membre != 6) erreur.push('Merci de choisir une Agence')
                                                                                                        else{
                                                                                                            if(helperServices.presence(dataRequest.photo)) erreur.push('Merci de remplir le champ Photo')
                                                                                                            else{
                                                                                                                if(helperServices.presence(dataRequest.piece)) erreur.push('Merci de choisir un Type de pièce d\'identité')  
                                                                                                                else{
                                                                                                                    if(helperServices.presence(dataRequest.etat_civil)) erreur.push('Merci de choisir un Etat-civil')     
                                                                                                                    else{
                                                                                                                        if(helperServices.presence(dataRequest.numero_piece)) erreur.push('Merci de remplir le champ Numéro pièce d\'identité') 
                                                                                                                        else{
                                                                                                                            if(helperServices.content_letter(dataRequest.adresse)) erreur.push('L\'adresse physique doit comporter au moins une lettre ')
                                                                                                                            else{
                                                                                                                                if(await personnelServices.check_email(dataRequest.email) !='' ) erreur.push('Cette adresse email est déjà utilisée ')
                                                                                                                                else{
                                                                                                                                    if(await personnelServices.check_telephone(dataRequest.telephone) !='' ) erreur.push('Ce numéro de téléphone est déjà utilisé')
                                                                                                                                    else{
                                                                                                                                        if(helperServices.valid_telephone(dataRequest.telephone)) erreur.push('Le numéro de téléphone saisi n\'est pas valide') 
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
                    if(await personnelServices.enregistrer_personnel(req.body,req.session.org,file) == false){
                        res.json({
                            reponse: 'r'
                        });
                    }else {
                        erreur.push('Le numéro de pièce d\'identité pour ce type de piece existe déjà dans la base de données')
                        res.json({
                            reponse: erreur
                        });
                    }
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
    change_state: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({
                    result: await personnelServices.change_state(req.body)
                });
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    rep_personnel: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({
                    result: await personnelServices.rep_personnel(req.body)
                });
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    on_personnel: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({
                    result: await personnelServices.on_personnel(req.body)
                });
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    update_personnel: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({
                    result: await personnelServices.update_personnel(req.body,req.session.id_compte)
                });
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    rep_type_membre: async (req, res)=> {
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {    
                res.json({
                    result: await personnelServices.rep_type_membre(req.body)
                });
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }
}
