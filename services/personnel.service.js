const {sequelize,Op,Employe,User,Membre,Partenaire_membre} = require('../config/db');
const fs = require('fs')
const bcrypt = require("bcrypt");
const axios = require('axios');

module.exports={
    update_profil_user: async (data,id_compte)=>{
        await User.update(
            { 
                email           :data.adresse_electronique,
                adresse_physique:data.adresse_physique,
                telephone       :data.telephone
            }, 
            {
            where: { 
                id : id_compte 
            }
        });
        return 'r'
    },
    check_telephone: async (telephone)=>{
        const [check_telephone, metadata_] = await sequelize.query("SELECT users.telephone FROM users WHERE users.telephone=:tel",
        {
            replacements: { tel:telephone }
        }); 
        const check_telephone_ = JSON.parse(JSON.stringify(check_telephone))
        return check_telephone_
    },
    check_email: async (email)=>{
        const [check_email, metadata_] = await sequelize.query("SELECT users.email FROM users WHERE users.email=:email",
        {
            replacements: { email:email }
        }); 
        const check_email_ = JSON.parse(JSON.stringify(check_email))
        return check_email_
    },
    check_email_profil: async (email,id_user)=>{
        const [check_email, metadata_] = await sequelize.query("SELECT users.email FROM users WHERE users.email=:email AND users.id <> :id_user",
        {
            replacements: { email:email,id_user:id_user }
        }); 
        const check_email_ = JSON.parse(JSON.stringify(check_email))
        return check_email_
    },
    check_telephone_profil: async (telephone,id_user)=>{
        const [check_telephone, metadata_] = await sequelize.query("SELECT users.telephone FROM users WHERE users.telephone=:tel AND users.id <> :id_user",
        {
            replacements: { tel:telephone,id_user:id_user }
        }); 
        const check_telephone_ = JSON.parse(JSON.stringify(check_telephone))
        return check_telephone_
    },
    check_state_user: async (id_user)=>{
        const [check_state_user, metadata_] = await sequelize.query("SELECT employes.etat_user FROM employes INNER JOIN users ON users.id=employes.id_user WHERE users.id=:id",
        {
            replacements: { id:id_user }
        }); 
        const check_state_user_ = JSON.parse(JSON.stringify(check_state_user))
        return check_state_user_
    },
    enregistrer_personnel : async function (data,structure,file){
        let ps              = '', 
            mdp_user        = "1234",
            salt            = await bcrypt.genSalt(10),
            mdp_hash        = await bcrypt.hash(mdp_user,salt),
            membre_existant = false
            
        const path = "public/photo/"+await this.nb_user()+ file.name,
              namePhoto = "static/photo/"+await this.nb_user()+ file.name
        
        if(await this.check_type_piece_and_num_piece(data) == ''){
            file.mv(path, async(err) => {
                if (err) {
                    res.send(err)
                }else {
                    if(await this.check_type_piece_and_num_piece(data) == ''){
                        if(data.type_membre == 6){
                            await sequelize.transaction(async (t) => {
                               /* if(await this.check_pseudo_membre(data.prenom)==''){
                                    ps=data.prenom
                                }else{
                                    ps=data.prenom + await this.nb_user()
                                }*/
                                let user = await User.create({
                                    prenom             :data.prenom,
                                    nom                :data.nom,
                                    post_nom           :data.postnom,
                                    sexe               :data.sexe,
                                    date_naissance     :data.date_naissance,
                                    lieu_naissance     :data.lieu_naissance,
                                    id_etat_civil      :data.etat_civil,
                                    id_type            :data.type_membre,
                                    email              :data.email,
                                    telephone          :data.telephone,
                                    numero_piece       :data.numero_piece,
                                    id_type_piece_ident:data.piece,
                                    adresse_physique   :data.adresse,
                                    photo              :namePhoto,
                                    id_province        :data.province
                                }, { transaction: t });
                                let membre = await Membre.create({
                                    id_user        :user.dataValues.id,
                                    id_type_membre :data.type_membre
                                }, { transaction: t });
                                let part_membre = await Partenaire_membre.create({
                                    id_partenaire    :0,
                                    id_membre        :membre.dataValues.id,
                                    etat_user        :1,
                                    pseudo           :data.prenom + membre.dataValues.id,
                                    mot_de_passe     :mdp_hash,
                                    etat_mot_de_passe:0
                                }, { transaction: t });

                                let code_us=''
                                    code_us += user.dataValues.id
                                    while (code_us.length < 6)  code_us = '0'+code_us

                                    console.log("******************************************* pseudo"+ part_membre.dataValues.pseudo)
                                    console.log("******************************************* mdp"+ mdp_user)
                                    console.log("******************************************* téléphone"+ user.dataValues.telephone)
                                    console.log("******************************************* code user"+ code_us)
                                    console.log("******************************************* type user"+ data.type_membre)
                                
                                 let numPhone= user.dataValues.telephone,
                                    message =`Votre compte vient d'être crée avec succès chez LoanMe       
                                    pseudo: ${part_membre.dataValues.pseudo} mdp : ${mdp_user}
                                    Vous aurez un IM lorsque vous serez affecté à une structure
                                    Veuillez changer votre mot de passe pour le sécuriser.
                                    Merci.`,
                                    url = `https://api2.dream-digital.info/api/SendSMS?api_id=API42124386641&api_password=x3McB19tzd&sms_type=T&encoding=T&sender_id=LoanMe CD&phonenumber=${numPhone}&textmessage=${message}`;
                                    const response = await axios.get(url);
                            });
                        }else{
                            await sequelize.transaction(async (t) => {
                              /*if(await this.check_pseudo_employe(data.prenom)==''){
                                    ps=data.prenom
                                }else{
                                    ps=data.prenom + await this.nb_user()
                                }*/
                                let user = await User.create({
                                    prenom             :data.prenom,
                                    nom                :data.nom,
                                    post_nom           :data.postnom,
                                    sexe               :data.sexe,
                                    date_naissance     :data.date_naissance,
                                    lieu_naissance     :data.lieu_naissance,
                                    id_etat_civil      :data.etat_civil,
                                    email              :data.email,
                                    telephone          :data.telephone,
                                    numero_piece       :data.numero_piece,
                                    id_type_piece_ident:data.piece,
                                    adresse_physique   :data.adresse,
                                    photo              :namePhoto,
                                    id_province        :data.province
                                }, { transaction: t });
                                let part_membre = await Employe.create({
                                    id_user           :user.dataValues.id,
                                    id_agence         :data.agence,
                                    id_partenaire     :1,
                                    id_type_employe   :data.type_membre,
                                    pseudo            :data.prenom + user.dataValues.id,
                                    mot_de_passe      :mdp_hash,
                                    etat_mot_de_passe :0,
                                }, { transaction: t });

                                let code_us=''
                                    code_us += user.dataValues.id
                                    while (code_us.length < 6)  code_us = '0'+code_us

                                    console.log("******************************************* pseudo "+ part_membre.dataValues.pseudo)
                                    console.log("******************************************* mdp "+ mdp_user)
                                    console.log("******************************************* téléphone "+ user.dataValues.telephone)
                                    console.log("******************************************* code user "+ code_us)
                                    console.log("******************************************* type user "+ data.type_membre)
                                
                                let numPhone= user.dataValues.telephone,
                                    message =`Bonjour, vous êtes désormais membre adhérent chez LoanMe       
                                    pseudo: ${part_membre.dataValues.pseudo} mdp : ${mdp_user}
                                    IM :  ${'0001-'+ code_us} Veuillez changer votre mot de passe pour
                                    le sécuriser. Bienvenue dans notre structure et merci de votre confiance.`,
                                    url = `https://api2.dream-digital.info/api/SendSMS?api_id=API42124386641&api_password=x3McB19tzd&sms_type=T&encoding=T&sender_id=LoanMe SFN&phonenumber=${numPhone}&textmessage=${message}`;
                                    const response = await axios.get(url);
                            })
                        }
                    }
                }
            })
        }else membre_existant=true
        return membre_existant
    },
    check_type_piece_and_num_piece : async (data)=>{ 
        const [type_piece_and_num_piece, meta] = await sequelize.query("SELECT users.* FROM users WHERE users.numero_piece=:num_piece AND users.id_type_piece_ident=:type_piece",
        {
            replacements: { num_piece:data.numero_piece,type_piece : data.piece}
        }),
        type_piece_and_num_piece_ = JSON.parse(JSON.stringify(type_piece_and_num_piece))
        return type_piece_and_num_piece_
    },
    check_pseudo_membre : async (pseudo)=>{ 
        const [on_personne, meta] = await sequelize.query("SELECT partenaire_membres.pseudo FROM membres INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN partenaires ON partenaires.id=partenaire_membres.id_partenaire WHERE partenaire_membres.pseudo=:ps",
        {
            replacements: { ps:pseudo }
        }),
        on_personne_ = JSON.parse(JSON.stringify(on_personne))
        return on_personne_
    },
    check_pseudo_employe : async (pseudo)=>{ 
        const [on_personne, meta] = await sequelize.query("SELECT employes.pseudo FROM employes INNER JOIN type_membres ON type_membres.id=employes.id_type_employe WHERE employes.pseudo=:ps",
        {
            replacements: { ps:pseudo }
        }),
        on_personne_ = JSON.parse(JSON.stringify(on_personne))
        return on_personne_
    },
    change_state : async (data)=>{ 
        let etat = 2
        if (data.state == 'Activer') etat = 1
        
        if(data.type == 6){
            await Partenaire_membre.update(
                { 
                    etat_user:etat
                }, 
                {
                where: {
                    id_membre:data.id_membre
                }
            });
        }else{
            await Employe.update(
                { 
                    etat_user:etat
                }, 
                {
                where: { 
                    id_user : data.id
                }
            });
        }
        return 'r'
    },
    nb_user : async ()=>{ 
        const [on_personne, meta] = await sequelize.query("SELECT COUNT(users.id) nb FROM users");
        let on_personne_ = JSON.parse(JSON.stringify(on_personne))
        return on_personne_[0].nb
    },
    rep_personnel : async (dataMembre)=>{
        let pers = ''
        if(dataMembre.type == 1){
            if(dataMembre.id == 6){
                const [pers_, meta] = await sequelize.query("SELECT users.*,partenaire_membres.id_membre id_memb,partenaire_membres.id_partenaire id_part,partenaire_membres.etat_user etat,type_membres.type_membre libelle,type_membres.id id_type FROM users INNER JOIN membres ON membres.id_user=users.id INNER JOIN type_membres ON type_membres.id=membres.id_type_membre INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN partenaires ON partenaire_membres.id_partenaire=partenaires.id WHERE type_membres.id=:type_membre",
                {
                    replacements: { type_membre:dataMembre.id }
                })
                pers = JSON.parse(JSON.stringify(pers_))
            }else{
                const [pers_, meta] = await sequelize.query("SELECT users.*,employes.etat_user etat,agences.denomination,type_employes.libelle,type_employes.id id_type FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN agences ON agences.id = employes.id_agence INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE type_employes.id=:type_membre",
                {
                    replacements: { type_membre:dataMembre.id }
                })
                pers = JSON.parse(JSON.stringify(pers_))
            }
        }else{
            const [pers_, meta] = await sequelize.query("SELECT users.*,agences.denomination FROM users INNER JOIN structure_users ON structure_users.id_user=users.id INNER JOIN agences ON agences.id = structure_users.id_agence WHERE users.id=:id AND users.id_type<>1 AND users.id_type<>7",
            {
                replacements: { id:dataMembre.id }
            })
            pers = JSON.parse(JSON.stringify(pers_))
        }
        return pers
    },
    on_personnel : async (data)=>{ 
        let on_personne_=''
        if(data.type == 6){
            const [on_personne, meta] = await sequelize.query("SELECT users.*,partenaires.id id_part,partenaire_membres.etat_user etat,partenaires.denomination,membres.id_type_membre id_type FROM users INNER JOIN membres ON membres.id_user=users.id INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN partenaires ON partenaires.id=partenaire_membres.id_partenaire INNER JOIN type_membres ON type_membres.id=membres.id_type_membre WHERE users.id=:id",
            {
                replacements: { id:data.id }
            })
            on_personne_ = JSON.parse(JSON.stringify(on_personne))
        }else{
            const [on_personne, meta] = await sequelize.query("SELECT users.*,agences.id id_agence,agences.denomination,employes.etat_user etat,employes.id_type_employe id_type FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN agences ON agences.id =employes.id_agence INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE users.id=:id",
            {
                replacements: { id:data.id }
            })
            on_personne_ = JSON.parse(JSON.stringify(on_personne)) 
        }
        return on_personne_
    },
    check_for_log : async (data)=>{ 
        const [employer, meta] = await sequelize.query("SELECT employes.id FROM employes WHERE employes.id_user=:id_user AND employes.id_agence=:id_agence AND employes.id_type_employe=:type",
        {
            replacements: { id_user:data.id_personnel,id_agence:data.agence,type:data.type }
        }),
        employer_ = JSON.parse(JSON.stringify(employer))
        return employer_
    },
    update_personnel : async function (data,id_user){
        if(await this.check_for_log(data) == ''){
                await Employe.update(
                    { 
                        id_agence      :data.agence,
                        id_type_employe:data.type
                    }, 
                    {
                    where: { 
                        id_user : data.id_personnel 
                    }
                });

                let donnees = {
                    'id_user' : data.id_personnel,
                    'id_agence': data.agence,
                    'id_partenaire':'',
                    'id_type_employe':data.type,
                    'pseudo':'',
                    'mot_de_passe':'',
                    'etat_mot_de_passe':'',
                    'id_user_editeur':id_user,
                    'action': 'Mise à jour employé',
                    'date_': new Date().toISOString()
                },
                dat = fs.readFileSync('Logs/employe.json'),
                donnees_conversees = JSON.parse(dat)
            donnees_conversees.push(donnees)
            let nouveau =  JSON.stringify(donnees_conversees) 
            fs.writeFileSync('Logs/employe.json', nouveau , err=>{
                if(err) throw err
            })
        }
        return 'r'
    },
    rep_type_membre : async (data)=>{
        const [rep_memb, meta] = await sequelize.query("SELECT type_employes.* FROM type_employes WHERE type_employes.id<>1 AND type_employes.id<>7");
        let rep_memb_ = JSON.parse(JSON.stringify(rep_memb))
        return rep_memb_
    }
};
