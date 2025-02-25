const {sequelize,Op,compte_money} = require('../config/db');
const axios = require('axios');

module.exports={
    get_adherent_by_im_id_piece:async function(data){
        let adherent_=''
        const [adherent, metadata_] = await sequelize.query("SELECT users.*,employes.etat_user etat_us,users.email use_mail,(users.id+1) membre_partrnaire,etat_civils.libelle eta,users.id id_user,partenaires.*,partenaires.id id_org,type_employes.id id_type FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN partenaires ON partenaires.id=employes.id_partenaire INNER JOIN etat_civils ON etat_civils.id=users.id_etat_civil INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE (users.numero_piece=:id_piece AND users.id_type_piece_ident=:id_tp_piece AND (CONCAT(LPAD(partenaires.id,4,0),'-',LPAD(users.id,6,0)))=:im)",
        {
            replacements: { id_piece:data.num_piece,id_tp_piece:data.type_piece,im:data.im }
        }); 
        adherent_ = JSON.parse(JSON.stringify(adherent)) // Membre de l'agence (ou du partenaire interne)

        if(adherent_ == ""){
            const [adherent, metadata_] = await sequelize.query("SELECT users.*,partenaire_membres.etat_user etat_us,etat_civils.libelle eta,users.id id_user,partenaires.*,partenaires.email use_mail,partenaires.id id_org,type_membres.id id_type FROM users INNER JOIN membres ON membres.id_user=users.id INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN etat_civils ON etat_civils.id=users.id_etat_civil INNER JOIN partenaires ON partenaires.id=partenaire_membres.id_partenaire INNER JOIN type_membres ON type_membres.id=membres.id_type_membre WHERE (users.numero_piece=:id_piece AND users.id_type_piece_ident=:id_tp_piece AND partenaires.id_national=:im)",
            {
                replacements: { id_piece:data.num_piece,id_tp_piece:data.type_piece,im:data.im }
            }); 
            adherent_ = JSON.parse(JSON.stringify(adherent)) // Partenaire
        }
        if(adherent_ == ""){
            const [adherent, metadata_] = await sequelize.query("SELECT users.*,partenaire_membres.etat_user etat_us,users.email use_mail,(users.id+1) membre_partrnaire,users.id_nationalite id_n,etat_civils.libelle eta,users.email email,users.id id_user,partenaires.id id_org,type_membres.id id_type FROM users INNER JOIN membres ON membres.id_user=users.id INNER JOIN etat_civils ON etat_civils.id=users.id_etat_civil INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN partenaires ON partenaires.id=partenaire_membres.id_partenaire INNER JOIN type_membres ON type_membres.id=membres.id_type_membre WHERE (users.numero_piece=:id_piece AND users.id_type_piece_ident=:id_tp_piece AND (CONCAT(LPAD(partenaires.id,4,0),'-',LPAD(users.id,6,0)))=:im)",
            {
                replacements: { id_piece:data.num_piece,id_tp_piece:data.type_piece,im:data.im }
            }); 
            adherent_ = JSON.parse(JSON.stringify(adherent)) // Membre du partenaire externe
        }
        return adherent_
    },
    rep_compte:async function(data){
        let rep_comp
        if(data.id == 1){
            const [rep_cmt, metadata_] = await sequelize.query("SELECT compte_moneys.id id_cmt,provinces.libelle prov,compte_moneys.type_compte tp,agences.id id_ag,compte_moneys.id_agence,users.*,agences.denomination,etat_civils.libelle etat,type_piece_identites.libelle type_piece,employes.id_user id_us,employes.id_partenaire id_part FROM compte_moneys INNER JOIN users ON compte_moneys.id_user=users.id INNER JOIN employes ON employes.id_user=users.id INNER JOIN agences ON compte_moneys.id_agence=agences.id INNER JOIN etat_civils ON etat_civils.id=users.id_etat_civil INNER JOIN provinces ON provinces.id=users.id_province INNER JOIN type_piece_identites ON type_piece_identites.id=users.id_type_piece_ident WHERE users.numero_piece=:id_piece AND users.id_type_piece_ident=:type_piece",
            {
                replacements: { id_piece : data.id_piece, type_piece : data.id_type_piece }
            })
            rep_comp = JSON.parse(JSON.stringify(rep_cmt)) // Répertoire des comptes membres internes

            if(rep_cmt == ''){
                const [rep_cmt, metad_] = await sequelize.query("SELECT compte_moneys.id id_cmt,provinces.libelle prov,compte_moneys.type_compte tp,agences.id id_ag,compte_moneys.id_agence,users.*,agences.denomination,etat_civils.libelle etat,type_piece_identites.libelle type_piece,membres.id_user id_us,partenaires.id id_part FROM compte_moneys INNER JOIN users ON compte_moneys.id_user=users.id INNER JOIN membres ON membres.id_user=users.id INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN partenaires ON partenaires.id=partenaire_membres.id_partenaire INNER JOIN agences ON compte_moneys.id_agence=agences.id INNER JOIN etat_civils ON etat_civils.id=users.id_etat_civil INNER JOIN provinces ON provinces.id=users.id_province INNER JOIN type_piece_identites ON type_piece_identites.id=users.id_type_piece_ident WHERE users.numero_piece=:id_piece AND users.id_type_piece_ident=:type_piece",
                {
                    replacements: { id_piece : data.id_piece, type_piece : data.id_type_piece }
                })
                rep_comp = JSON.parse(JSON.stringify(rep_cmt)) // Répertoire des comptes membres externes
            }
        }else{  
            const [rep_cmt, metadata_] = await sequelize.query("SELECT compte_moneys.id id_cmt,etat_civils.libelle etat,provinces.libelle dn_prov,type_piece_identites.libelle type_piece,compte_moneys.type_compte tp,agences.id id_ag,compte_moneys.id_agence,partenaires.*,agences.denomination dn,users.*,users.id id_us FROM compte_moneys INNER JOIN partenaires ON compte_moneys.id_partenaire=partenaires.id INNER JOIN agences ON compte_moneys.id_agence=agences.id INNER JOIN partenaire_membres ON partenaires.id=partenaire_membres.id_partenaire INNER JOIN membres ON membres.id=partenaire_membres.id_membre INNER JOIN users ON users.id=membres.id_user INNER JOIN type_membres ON type_membres.id=membres.id_type_membre INNER JOIN etat_civils ON etat_civils.id=users.id_etat_civil INNER JOIN provinces ON provinces.id=users.id_province INNER JOIN type_piece_identites ON type_piece_identites.id=users.id_type_piece_ident WHERE partenaires.id_national=:id_nat AND type_membres.id=6",
            {
                replacements: { id_nat : data.id_nat }
            })
            rep_comp = JSON.parse(JSON.stringify(rep_cmt)) // Répertoire des comptes partenaires
        }
        return rep_comp
    },
    search_compte_user:async function(cmt){
        let compte_ = ''
        const [compte, meta] = await sequelize.query("SELECT (CONCAT(LPAD(compte_moneys.id_agence,4,1),'-',LPAD(compte_moneys.id,11,1))) compte,compte_moneys.id id_cmt,compte_moneys.id_user id_user,users.* FROM compte_moneys INNER JOIN users ON users.id=compte_moneys.id_user WHERE compte_moneys.id=:id_cmt",
        {
            replacements: { id_cmt:cmt }
        })
        compte_ = JSON.parse(JSON.stringify(compte)) 
        return compte_
    },
    search_compte_patner:async function(cmt){
        let compte_ = ''
        const [compte, meta] = await sequelize.query("SELECT (CONCAT(LPAD(compte_moneys.id_agence,4,1),'-',LPAD(compte_moneys.id,11,1))) compte,compte_moneys.id id_cmt, partenaires.* FROM compte_moneys INNER JOIN partenaires ON partenaires.id=compte_moneys.id_partenaire WHERE compte_moneys.id=:id_cmt",
        {
            replacements: { id_cmt:cmt }
        })
        compte_ = JSON.parse(JSON.stringify(compte)) 
        return compte_
    },
    create_compte:async function(compte,id_compte){
        let id_cmt='',
            cmt
        //await sequelize.transaction(async (t) => {
            if(compte.membre_partrnaire == true){
                if(await this.check_type_compte_and_id_user(compte) =='' ){
                    let comp = await compte_money.create({
                        type_compte  :compte.type_compte,
                        statut       :'inactif',
                        id_agence    :compte.id_agence,
                        id_user      :compte.id_member,
                        id_partenaire:0
                    }/*, { transaction: t }*/)
                    id_cmt = comp.dataValues.id
                    
                    let compt = await this.search_compte_user(id_cmt),
                        numPhone=compt[0].telephone,
                        message=`Vous venez de creer un compte ${comp.dataValues.type_compte} : ${compt[0].compte} `,
                        url = `https://api2.dream-digital.info/api/SendSMS?api_id=API12506297241&api_password=x3McB19tzd&sms_type=T&encoding=T&sender_id=FINUSECO&phonenumber=${numPhone}&textmessage=${message}`;
                    const response = await axios.get(url);
                }
            }else{ 
                if(await this.check_type_compte_and_id_partenaire(compte) =='' ){
                    let comp = await compte_money.create({
                        type_compte  :compte.type_compte,
                        statut       :'inactif',
                        id_agence    :compte.id_agence,
                        id_user      :0,
                        id_partenaire:compte.id_partenaire
                    }/*, { transaction: t }*/)
                    id_cmt = comp.dataValues.id
                    
                    let compt = await this.search_compte_patner(id_cmt),
                        numPhone=compt[0].telephone,
                        message=`Vous venez de creer un compte ${comp.dataValues.type_compte} : ${compt[0].compte} `,
                        url = `https://api2.dream-digital.info/api/SendSMS?api_id=API12506297241&api_password=x3McB19tzd&sms_type=T&encoding=T&sender_id=FINUSECO&phonenumber=${numPhone}&textmessage=${message}`;
                    
                    const response = await axios.get(url);
                }
            }
        //})
        return id_cmt
    },
    check_type_compte_and_id_user:async function(compte){
        const [check_type_compte, metadata_] = await sequelize.query("SELECT compte_moneys.* FROM compte_moneys WHERE compte_moneys.type_compte=:type_compte AND compte_moneys.id_user=:user",
        {
            replacements: { user:compte.id_member, type_compte:compte.type_compte }
        }),
        check_type_compte_ = JSON.parse(JSON.stringify(check_type_compte))
        return check_type_compte_
    },
    check_type_compte_and_id_partenaire:async function(compte){
        const [check_type_compte, metadata_] = await sequelize.query("SELECT compte_moneys.* FROM compte_moneys WHERE compte_moneys.type_compte=:type_compte AND compte_moneys.id_partenaire=:part",
        {
            replacements: { part:compte.id_partenaire, type_compte:compte.type_compte }
        }),
        check_type_compte_ = JSON.parse(JSON.stringify(check_type_compte))
        return check_type_compte_
    }
};
