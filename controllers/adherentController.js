const bcrypt            = require('bcrypt');
const Validator         = require('body-validator');
const adherentService   = require('../services/adherent.service'); 
const helperServices    = require('../helper/helper');

module.exports={
    get_adherent_by_im_id_piece:async function (req,res){
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                let bodyRequest  = req.body; 
                res.json({ result : await adherentService.get_adherent_by_im_id_piece(bodyRequest) });
            }
            catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    rep_compte:async (req,res)=>{
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                let bodyRequest  = req.body;
                res.json({ result : await adherentService.rep_compte(bodyRequest) });
            }
            catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    create_compte:async (req,res)=>{
        if(typeof req.session.pseudo !== 'undefined' && typeof req.session.org !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {  
                let bodyRequest  = req.body,
                    erreur=[]
                if(helperServices.presence(bodyRequest.type_compte)) erreur.push('Merci de choisir un type de compte')
                else{
                    if(helperServices.taille(bodyRequest.type_compte,7)) erreur.push('Le type de compte ne peut pas comprendre plus de 7 caractères')
                    else{
                        if(bodyRequest.type_compte != "Courant" && bodyRequest.type_compte != "Epargne" ) erreur.push('Le type de compte doit être soit Courant soit Epargne ')
                        else{
                            if(helperServices.presence(bodyRequest.id_agence)) erreur.push('Aucune agence n\'est identifiée')
                            else{
                                if(helperServices.presence(bodyRequest.id_member)) erreur.push('Aucun membre n\'est identifié')
                                else{
                                    if(helperServices.presence(bodyRequest.id_organisation)) erreur.push('Aucune structure n\'est identifiée')
                                    else{
                                        if(helperServices.presence(bodyRequest.statut)) erreur.push('Aucun statut n\'est indiqué')
                                    }
                                }
                            }
                        }
                    }
                }
                if(erreur==''){
                    if(await adherentService.create_compte(bodyRequest,req.session.id_compte) =='' ){ 
                        erreur.push('L\'utilisateur a déjà crée ce type de compte')
                        res.json({ result : erreur });
                    }else{
                        res.json({ result : await adherentService.create_compte(bodyRequest,req.session.id_compte),r:'r' });
                    }
                }else{
                    res.json({
                        result: erreur
                    });
                }
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }
}