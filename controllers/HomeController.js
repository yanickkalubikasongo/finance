require('dotenv').config();
const Validator          = require('body-validator');
const {sequelize,Partenaire} = require('../config/db'); 
const fs                 = require('fs/promises');
const utilisateurService = require('../services/utilisateur.service');
const bcrypt             = require("bcrypt");
const { date_valid } = require('../helper/helper');
const nodemailer = require('nodemailer');

module.exports={
    index:async (req,res)=>{
        message_alerte_authent = req.params.message
        res.render('connexion_admin',{
            message_alerte_authent
        });
    },
    create_new_mdp:async (req,res)=>{
       let BodyRequest = req.body,
           msg_err_new_mdp 

       if(BodyRequest.new_mdp == BodyRequest.mdp_confirm){
            delete req.params
            let user = await utilisateurService.check_pseudo(BodyRequest),
                ancien_mdp = ( user != '') ? user[0].mot_de_passe : ''

            if(await bcrypt.compare(BodyRequest.mdp, ancien_mdp) == true){
                if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/.test(BodyRequest.new_mdp)) {  
                    msg_err_new_mdp = 'Le mot de passe doit être composé de 10 caractères; avoir au moins une lettre majuscule, une lettre miniscule, un chiffre, et un caractère special.'
                    res.redirect('/enregister_modif_mdp/'+ msg_err_new_mdp);
                }else{
                    await utilisateurService.create_new_mdp_(BodyRequest)
                    res.redirect('/');
                }
            }else{
                msg_err_new_mdp = 'Pseudo ou mot de passe introuvable'
                res.redirect('/enregister_modif_mdp/'+ msg_err_new_mdp);
            }
        }else{
            msg_err_new_mdp = 'Les deux nouveaux mots de passe ne correspondent pas'
            res.redirect('/enregister_modif_mdp/'+ msg_err_new_mdp);
        }
    },
    mdp_oublie:async (req,res)=>{
        /*
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ir.yanickkalubi@gmail.com',
              pass: 'aCTio_pa$99'
            }
          });
          
          var mailOptions = {
            from: 'ir.yanickkalubi@gmail.com',
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });   */
    },
    enregister_modif_mdp:async (req,res)=>{
        
        res.render('Authentification/changement_mot_de_passe',{
            msg:req.params.msg_err_new_mdp
        });
    },
    authentification_admin : async(req,res)=>{
        try {
            delete req.params
            let pseudo_ = req.body.Pseudo,
                mdp_ = req.body.mdp,
                message = ''
                
            if(typeof pseudo_ !== 'undefined' && typeof mdp_ !== 'undefined' ) {
                let utilisateur = await utilisateurService.check_pseudo_mdp_admin_plat(pseudo_),
                    connexion1 = await utilisateurService.connexion_administrateur(pseudo_)
                    
                let connexion = ''
                
                if(connexion1 !=''){
                    if(await bcrypt.compare(mdp_,connexion1[0].mdp) == true){
                        connexion = connexion1
                    }
                }

                if(connexion == '' || utilisateur ==''){
                    message = 'Coordonnées introuvables'
                    res.redirect('/administrateur/'+ message)
                }else{
                    if(utilisateur[0].typee == 1){
                        if(utilisateur[0].etat_mdp == 1){
                            req.session.org       = utilisateur[0].id_o
                            req.session.pseudo    = pseudo_
                            req.session.mdp       = mdp_
                            req.session.id_compte = utilisateur[0].id
                            if(req.body.Pseudo) await utilisateurService.create_connexion(req.session.id_compte)
                            res.redirect('/actualisation/'+ pseudo_)
                        } else res.render('Authentification/changement_mot_de_passe')
                    }
                }
            }else{
                message = 'Pseudo ou Mot de passe manquant'
                res.redirect('/administrateur/'+ message)
            }
        } catch (error) {
            res.send('Erreur : '+ error)
        }
    },
    actualisation : async(req,res)=>{  
        //if(typeof req.session.org !== 'undefined' && typeof req.session.pseudo !== 'undefined' && typeof req.session.mdp !== 'undefined' && typeof req.session.id_compte !== 'undefined')  {
            try {
                let connexion1 = await utilisateurService.connexion_administrateur((req.params.pseudo_) ? req.params.pseudo_ : req.session.pseudo),
                    utilisateur= await utilisateurService.check_pseudo_mdp_admin_plat((req.params.pseudo_) ? req.params.pseudo_ : req.session.pseudo)
                    
                res.render('home',{
                    type :utilisateur[0].typee,
                    photo: connexion1
                });

            } catch (error) {
                res.send('Erreur : '+ error)
            }
        /*}else{
            res.redirect('/')
        }*/
    },
    changer_mdp: async (req, res)=> {
         try {
            let erreur = req.params.erreur
            if(erreur){
                res.json({erreur})
            }else res.render('Authentification/changement_mot_de_passe')
        } catch (error) {
            res.send('Erreur '+ error)
        }
    },
    deconnexion : async function (req, res) {
        try {
            if(req.session.id_compte){
                await utilisateurService.deconnexion_simple_user(req.session.id_compte)
                
                delete req.session.pseudo
                delete req.session.org
                delete req.session.mdp
                delete req.session.id_compte
            }
            res.redirect('/administrateur')
        } catch (error) {
            res.send('Erreur '+error)
        }
    },
    deconnexion_admin : async (req, res)=> {
        try { 
            let pseudo_session =  req.session.pseudo,
                agence_session = req.session.org,
                id_compte_session = req.session.id_compte,
                mdp_session = req.session.mdp
            if(typeof pseudo_session !== 'undefined' && typeof agence_session !== 'undefined' && typeof id_compte_session !== 'undefined' && typeof mdp_session !== 'undefined')  {
                
               await utilisateurService.deconnexion_simple_user(id_compte_session)
                delete req.session.pseudo
                delete req.session.org
                delete req.session.mdp
                delete req.session.id_compte
               // res.redirect("/")
               res.json({d : 'yes'})
            }
        } catch (error) {
            res.send('Erreur '+error)
        }
    },
    tableau_bord : async (req,res)=>{
        try {
            let pseudo_session =  req.session.pseudo,
                agence_session = req.session.agence,
                id_compte_session = req.session.id_compte
            if(typeof pseudo_session !== 'undefined' && typeof agence_session !== 'undefined' && typeof id_compte_session !== 'undefined')  {
                const [pat, metadata] = await sequelize.query("SELECT * FROM patients INNER JOIN dossier_medicals ON patients.id=dossier_medicals.patient_id INNER JOIN priseencharges ON priseencharges.dossier_med_id=dossier_medicals.id WHERE priseencharges.type_id = 1 AND priseencharges.hospital_id = :hp ",
                {
                    replacements: { hp : agence_session}
                });
                const patien = JSON.parse(JSON.stringify(pat))

                const [cmt, metada] = await sequelize.query("SELECT COUNT(comptes.id) FROM comptes INNER JOIN hopital_comptes ON hopital_comptes.id_compte=comptes.id INNER JOIN hopitals ON hopitals.id=hopital_comptes.id_hopital WHERE hopital_comptes.etat_compte = 'Desactiver' AND hopital_comptes.id_hopital = :hp",
                {
                    replacements: { hp : agence_session}
                });
                const cmtt = JSON.parse(JSON.stringify(cmt))

                res.render('tableau_de_bord',{
                    patien,
                    cmtt
                });
            }else{
                res.redirect('/administrateur')
            }
        } catch (error) {
            res.send("erreur :"+ error)
        }
    },
    traitement_deconnexion : async (req,res)=>{
        try {
            let pseudo_session =  req.session.pseudo,
                agence_session = req.session.agence,
                id_compte_session = req.session.id_compte
            if(typeof pseudo_session !== 'undefined' && typeof agence_session !== 'undefined' && typeof id_compte_session !== 'undefined')  {

                req.session.jour = new Date().getDate()
                req.session.heure = new Date().getHours()
                req.session.min = new Date().getMinutes()

              //  if(req.body.jour_ == req.session.jour){
                    res.send('Hello')
                //}


            }else{
                res.redirect('/administrateur')
            }
        } catch (error) {
            res.send("erreur :"+ error)
        }
    }
}
