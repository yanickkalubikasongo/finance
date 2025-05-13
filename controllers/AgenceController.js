const bcrypt            = require('bcrypt');
const Validator         = require('body-validator');
const agenceService     = require('../services/agence.service'); 
const {sequelize}       = require('../config/db');
const helperServices    = require('../helper/helper');

module.exports={
    send_payement:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                let erreur=[],
                    bodyRequest = req.body
                
              /*  if(await agenceService.check_payement(bodyRequest) != ''){
                    erreur.push('Le payement de l\'année et mois indiqués est déjà effectué')
                }else{*/
                    if(helperServices.presence(bodyRequest.montant)) erreur.push('Merci de saisir le montant')
                    else{
                        if(helperServices.chaine(bodyRequest.montant)) erreur.push('Merci de saisir un chiffre')
                        else{
                            if(parseFloat(bodyRequest.montant) <= 0) erreur.push('Merci de saisir un montant supérieur à 0')
                            else{
                                if(helperServices.presence(bodyRequest.devise)) erreur.push('Merci de choisir la devise')
                                else{
                                    if(helperServices.presence(bodyRequest.motif)) erreur.push('Merci de choisir le motif')
                                    else{
                                        if(bodyRequest.motif == 3 && await agenceService.check_compte(bodyRequest) =='') erreur.push('Ce compte n\'existe pas')
                                    }
                                }
                            }
                        }
                    }
              //  }

                if(erreur==''){
                    let send = await agenceService.send_payement(req.body,req.session.id_compte,req.session.org)
                    if(send == 2) {
                        erreur.push('Le solde Wallet Don est un insuffissant')
                        res.json({
                            result: erreur
                        });
                    }
                    else{
                        if(send == 1){
                            erreur.push('Cet utilisateur est désactivé')
                            res.json({
                                result: erreur
                            });
                        }else{
                            if(send == 0){
                                res.json({
                                    result : 0
                                });
                            }
                        }
                    }
                }else{
                    res.json({
                        result: erreur
                    });
                }
                
                } catch (error) {
                    res.send('Erreur '+ error)
                }
            }else{
                res.json({result : 'deconnexion'});
            }
    }, 
    create_monnaie:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                let erreur=[],
                    bodyRequest = req.body
                if(helperServices.presence(bodyRequest.agence)) erreur.push('Merci de choisir l\'agence')
                else{
                    if(helperServices.presence(bodyRequest.montant)) erreur.push('Merci de saisir le montant')
                    else{
                        if(helperServices.presence(bodyRequest.devise)) erreur.push('Merci de choisir la devise')
                    }
                }
                if(erreur==''){
                    res.json({
                        result: await agenceService.create_monnaie(bodyRequest)
                    });
                }else{
                    res.json({
                        result: erreur
                    });
                }
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }
        else{
            res.json({result : 'deconnexion'});
        }
    },
    rep_charge:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
        
            try { 
                res.json({
                    result : await agenceService.rep_charge()
                }); 
                
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    solde_agence:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
         
            try {
                let bodyRequest = req.body
                res.json({
                    result1 : await agenceService.solde_monnaie_electronique_agence(bodyRequest.id,'CDF'),
                    result2 : await agenceService.solde_monnaie_electronique_agence(bodyRequest.id,'USD'),
                    result3 : await agenceService.solde_monnaie_electronique_agence(bodyRequest.id,'EUR')
                });
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    wallet_revenu:async (req,res)=>{
        if(req.session.org)  {
            
            try {
                console.log("**************************************************************** tale")
                res.json({
                    result1 : await agenceService.wallet_revenu('CDF'),
                    result2 : await agenceService.wallet_revenu('USD'),
                    result3 : await agenceService.wallet_revenu('EUR'),
                });
                
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    wallet_don:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            
            try {
                res.json({
                    result1        : await agenceService.wallet_don('CDF'),
                    result2        : await agenceService.wallet_don('USD'),
                    result3        : await agenceService.wallet_don('EUR'),
                    gc             : await agenceService.gestionnaire_credit(),
                    prep           : await agenceService.prepose(),
                    agence         : await agenceService.nb_agence(),
                    part           : await agenceService.nb_partenaire(),
                    cp             : await agenceService.users(),
                    compte_epargne : await agenceService.compte_epargne(), 
                    compte_courant : await agenceService.compte_courant(),
                    agent_agence   : await agenceService.agent_agence(),
                    agent_terrain  : await agenceService.agent_terrain(),

                    membres        : await agenceService.membres(),
                    membre_actif   : await agenceService.membre_actif(),
                    membre_inactif : parseInt(await agenceService.membres()) - parseInt(await agenceService.membre_actif())
                }); 
            }catch (error) {
                res.send('Erreur '+ error)
            } 
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    send_depot_wallet_don:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
         
            try {
                let erreur=[],
                    bodyRequest = req.body
                    
                if(helperServices.presence(bodyRequest.montant)) erreur.push('Merci de saisir le montant')
                else{
                    if(helperServices.presence(bodyRequest.devise)) erreur.push('Merci de choisir la devise')
                    else{
                        if(helperServices.chaine(bodyRequest.montant)) erreur.push('Merci de saisir le chiffre')
                        else{
                            if(parseFloat(bodyRequest.montant) <= 0) erreur.push('Merci de saisir un montant supérieur à 0')
                        }
                    }
                }
                if(erreur==''){
                    res.json({ result1 : await agenceService.send_depot_wallet_don(bodyRequest) });
                }else{
                    res.json({
                        result1: erreur
                    });
                }
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    create:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
         
            try {
                let bodyRequest = req.body,
                    erreur=[]
                if(helperServices.presence(bodyRequest.denomination)) erreur.push('Merci de saisir la denomination')
                else{
                    if(helperServices.letter_beginning(bodyRequest.denomination)) erreur.push('La denomination doit commencer par une lettre')
                    else{
                        if(helperServices.taille(bodyRequest.denomination,30)) erreur.push('La taille de la denomination doit être inférieure ou égale à 30')
                        else{
                                if(helperServices.taille(bodyRequest.ref_parcelle,6)) erreur.push('La taille de la référence doit être inférieure ou égale à 15')
                                else{
                                    if(helperServices.presence(bodyRequest.ref_parcelle)) erreur.push('Merci de saisir la référence') 
                                    else{
                                        if(helperServices.presence(bodyRequest.commune)) erreur.push('Merci de choisir la commune')
                                        else{
                                            if(helperServices.taille(bodyRequest.commune,15)) erreur.push('Merci de choisir la commune') 
                                            else{
                                                if(helperServices.taille(bodyRequest.telephone,13)) erreur.push('La taille du numéro téléphonique doit être inférieure ou égale à 15') 
                                                else{
                                                    if(helperServices.presence(bodyRequest.telephone)) erreur.push('Merci de choisir le numéro téléphonique') 
                                                    else{
                                                        if(helperServices.presence(bodyRequest.avenue)) erreur.push('Merci de saisir l\'avenue')
                                                        else{
                                                            if(helperServices.taille(bodyRequest.avenue,15)) erreur.push('La taille de l\'avanue doit être inférieure ou égale à 20')
                                                            else{
                                                                if(helperServices.presence(bodyRequest.quartier)) erreur.push('Merci de saisir le quartier')
                                                                else{
                                                                    if(helperServices.taille(bodyRequest.quartier,15)) erreur.push('La taille de du quartier doit être inférieure ou égale à 20')
                                                                    else{
                                                                        if(helperServices.letter_beginning(bodyRequest.avenue)) erreur.push('L\'avenue doit commencer par une lette')
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
                    res.json({result:await agenceService.create(bodyRequest)});
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
    },
    repertoire:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
         
            try {
                res.json({result:await agenceService.repertoire()});
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }, 
    rep_transaction:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {

            try {
                res.json({result:await agenceService.transac(req.body)});
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }, 
    create_poucentage_depot:async (req,res)=>{
        try {
            if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
                
                let bodyRequest = req.body,
                    erreur=[]

                if(helperServices.presence(bodyRequest.minimum)) erreur.push('Merci de saisir le montant minimun')
                else{
                    if(isNaN(bodyRequest.minimum)) erreur.push('Merci de saisir un chiffre pour le montant minimum')
                    else{
                        if(helperServices.presence(bodyRequest.maximum)) erreur.push('Merci de saisir le montant maximun')
                        else{
                            if(isNaN(bodyRequest.maximum)) erreur.push('Merci de saisir un chiffre pour le montant maximum')
                            else{
                                if(helperServices.presence(bodyRequest.frais)) erreur.push('Merci de saisir le pourcentage')
                                else{
                                    if(helperServices.presence(bodyRequest.devise)) erreur.push('Merci de choisir la devise')
                                }
                            }
                        }
                    }
                }

                if(erreur==''){
                    res.json({result:await agenceService.create_poucentage_depot(req.body)});
                }else{
                    res.json({ result: erreur });
                }
            }else{
                res.json({result : 'deconnexion'});
            }
        }catch (error) {
            res.send('Erreur '+ error)
        }
    }, 
    select_poucentage_depot:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
         
            try {
                res.json({result:await agenceService.select_poucentage_depot()});
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }, 
    send_pourcentage:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
             
            try {
                let bodyRequest = req.body,
                    erreur=[]
                if(helperServices.presence(bodyRequest.credit)) erreur.push('Merci de saisir saisir le pourcentage de crédit')
                else{
                    if(helperServices.presence(bodyRequest.agent)) erreur.push('Merci de saisir la rétrocession des agents')
                    else{
                        if(helperServices.presence(bodyRequest.cout)) erreur.push('Merci de saisir le coût IM')
                        else{
                            if(helperServices.presence(bodyRequest.penalite)) erreur.push('Merci de saisir la pénalitté dû au retard de rembourssement')
                            else{
                                if(helperServices.presence(bodyRequest.montant_max)) erreur.push('Merci de saisir le montant maximal à emprunter')
                                else{
                                    if(helperServices.presence(bodyRequest.taux_change)) erreur.push('Merci de saisir le taux de change')
                                    else{
                                        if(isNaN(bodyRequest.taux_change)) erreur.push('Merci de saisir en chiffre le taux de change')
                                        else{
                                            if(isNaN(bodyRequest.montant_max)) erreur.push('Merci de saisir en chiffre le montant maximal à emprunter')
                                            else{
                                                if(isNaN(bodyRequest.penalite)) erreur.push('Merci de saisir en chiffre la pénalité dû au retard de rembourssement')
                                                else{
                                                    if(isNaN(bodyRequest.cout)) erreur.push('Merci de saisir en chiffre le coût IM')
                                                    else{
                                                        if(isNaN(bodyRequest.agent)) erreur.push('Merci de saisir en chiffre la rétrocession des agents')
                                                        else{
                                                            if(isNaN(bodyRequest.credit)) erreur.push('Merci de saisir en chiffre le pourcentage de crédit')
                                                            else{
                                                                if(bodyRequest.agent < 2 ) erreur.push('La valeur de rétrocession doit être supérieure à 1 et inférieure à 5')
                                                                else{
                                                                    if(bodyRequest.agent > 5 ) erreur.push('La valeur de rétrocession doit être supérieure à 1 et inférieure à 5')
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
                    res.json({result:await agenceService.send_pourcentage(req.body)});
                }else{
                    res.json({ result: erreur });
                }
                
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }, 
    on_agence:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
        
            try { 
                res.json({result:await agenceService.on_agence(req.body)});
            
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }, 
    update:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                let bodyRequest = req.body,
                    erreur=[]

                if(helperServices.presence(bodyRequest.denomination)) erreur.push('Merci de saisir la denomination')
                else{
                    if(helperServices.letter_beginning(bodyRequest.denomination)) erreur.push('La denomination doit commencer par une lettre')
                    else{
                        if(helperServices.taille(bodyRequest.denomination,30)) erreur.push('La taille de la denomination doit être inférieure ou égale à 30')
                        else{
                            if(helperServices.taille(bodyRequest.ref_parcelle,6)) erreur.push('La taille de la référence doit être inférieure ou égale à 15')
                            else{
                                if(helperServices.presence(bodyRequest.ref_parcelle)) erreur.push('Merci de saisir la référence') 
                                else{
                                    if(helperServices.presence(bodyRequest.commune)) erreur.push('Merci de choisir la commune')
                                    else{
                                        if(helperServices.taille(bodyRequest.commune,15)) erreur.push('Merci de choisir la commune') 
                                        else{
                                            if(helperServices.taille(bodyRequest.telephone,13)) erreur.push('La taille du numéro téléphonique doit être inférieure ou égale à 15') 
                                            else{
                                                if(helperServices.presence(bodyRequest.telephone)) erreur.push('Merci de choisir le numéro téléphonique') 
                                                else{
                                                    if(helperServices.presence(bodyRequest.avenue)) erreur.push('Merci de saisir l\'avenue')
                                                    else{
                                                        if(helperServices.taille(bodyRequest.avenue,15)) erreur.push('La taille de l\'avanue doit être inférieure ou égale à 20')
                                                        else{
                                                            if(helperServices.presence(bodyRequest.quartier)) erreur.push('Merci de saisir le quartier')
                                                            else{
                                                                if(helperServices.taille(bodyRequest.quartier,15)) erreur.push('La taille de du quartier doit être inférieure ou égale à 20')
                                                                else{
                                                                    if(helperServices.letter_beginning(bodyRequest.avenue)) erreur.push('L\'avenue doit commencer par une lette')
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
                    let respon = await agenceService.update(req.body,req.session.id_compte)
                    if(respon =='r'){
                        res.json({
                            result:'r'
                        });
                    }else{
                        if(respon =='null'){
                            erreur.push('Aucune mise à jour n\'est effectuée')
                            res.json({
                                result:erreur
                            });
                        }
                    }
                }else{
                    res.json({
                        result: erreur
                    });
                }
            } catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    on_transaction:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
         
            try {
                res.json({result:await agenceService.on_transaction(req.body)});
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }, 
    update_transaction:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
         
            try {

                let bodyRequest = req.body,
                    erreur=[]

                if(helperServices.presence(bodyRequest.min)) erreur.push('Merci de saisir le montant minimum')
                else{
                    if(isNaN(bodyRequest.min)) erreur.push('Merci de saisir un chiffre pour le montant minimum')
                    else{
                        if(helperServices.presence(bodyRequest.max)) erreur.push('Merci de saisir le montant maximun')
                        else{
                            if(isNaN(bodyRequest.max)) erreur.push('Merci de saisir un chiffre pour le montant maximun')
                            else{
                                if(helperServices.presence(bodyRequest.frais)) erreur.push('Merci de saisir le frais')
                                else{
                                    if(helperServices.presence(bodyRequest.id)) erreur.push('Aucune agence n\'est indiquée')
                                }
                            }
                        }
                    }
                }

                if(erreur==''){
                    let respon = await agenceService.update_transaction(req.body,req.session.id_compte)
                    if(respon =='r'){
                        res.json({ result:'r' });
                    }else{
                        if(respon =='null'){
                            erreur.push('Aucune mise à jour n\'est effectuée')
                            res.json({
                                result:erreur
                            });
                        }
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
    },
    rep_province:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({result:await agenceService.rep_province()});
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    rep_type_piece:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try { 
                res.json({result:await agenceService.rep_type_piece()});
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    rep_type_membre:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({
                    result :await agenceService.rep_type_membre(),
                    result2:await agenceService.rep_type_membre_partenaire()
                });
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    },
    rep_etat_civil:async (req,res)=>{
        if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                res.json({result:await agenceService.rep_etat_civil()});
            }catch (error) {
                res.send('Erreur '+ error)
            }
        }else{
            res.json({result : 'deconnexion'});
        }
    }
}