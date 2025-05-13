const {sequelize,Op,Partenaire,Partenaire_membre} = require('../config/db');
const fs = require('fs')
const axios = require('axios');

module.exports={
    check_telephone_partenaire: async (telephone)=>{
        const [check_telephone, metadata_] = await sequelize.query("SELECT partenaires.telephone FROM partenaires WHERE partenaires.telephone=:tel",
        {
            replacements: { tel:telephone }
        }); 
        const check_telephone_ = JSON.parse(JSON.stringify(check_telephone))
        return check_telephone_
    },
    check_rccm_partenaire: async (rccm_f)=>{
        const [check_rccm_f, metadata_] = await sequelize.query("SELECT partenaires.rccm_f FROM partenaires WHERE partenaires.rccm_f=:rccm_f",
        {
            replacements: { rccm_f:rccm_f }
        }); 
        const check_rccm_f_ = JSON.parse(JSON.stringify(check_rccm_f))
        return check_rccm_f_
    },
    check_id_national_partenaire: async (id_national)=>{
        const [check_id_national, metadata_] = await sequelize.query("SELECT partenaires.id_national FROM partenaires WHERE partenaires.id_national=:id_national",
        {
            replacements: { id_national:id_national }
        }); 
        const check_id_national_ = JSON.parse(JSON.stringify(check_id_national))
        return check_id_national_
    },
    check_email_partenaire: async (email)=>{
        const [check_email, metadata_] = await sequelize.query("SELECT partenaires.email FROM partenaires WHERE partenaires.email=:email",
        {
            replacements: { email:email }
        }); 
        const check_email_ = JSON.parse(JSON.stringify(check_email))
        return check_email_
    },
    enregistrer_partenaire : async function (dataPartenaire,file){
        try {
            let path = "public/autorisation/"+ await this.nb_user() + file.name,
                aut = "static/autorisation/"+ await this.nb_user() + file.name
            file.mv(path, async(err) => {
                if (err) { 
                    res.send(err)
                }else {
                    await sequelize.transaction(async (t) => {
                        let part = await Partenaire.create({ 
                            denomination    : dataPartenaire.denomination,
                            id_national     : dataPartenaire.id_nat,
                            rccm_f          : dataPartenaire.rccm_f,
                            telephone       : dataPartenaire.telephone,
                            email           : dataPartenaire.email,
                            adresse_physique: dataPartenaire.adresse_physique,
                            etat            : 1,
                            autorisation    : aut
                        },{ transaction: t });
                        await Partenaire_membre.update(
                            { 
                                id_partenaire :part.dataValues.id
                            }, 
                            {
                            where: { 
                                id_membre : dataPartenaire.id_gerant 
                            }
                        },{ transaction: t });

                        let code_us=''
                            code_us += dataPartenaire.id_user
                        while (code_us.length < 6)  code_us = '0'+code_us

                        let code_partenaire=''
                            code_partenaire += part.dataValues.id
                        while (code_partenaire.length < 4)  code_partenaire = '0'+code_partenaire
                        console.log("********************************************denomination"+ part.dataValues.denomination)
                        console.log("********************************************gérant "+ code_partenaire+ '-' + code_us)
                        console.log("********************************************téléphone"+ part.dataValues.telephone)
                       
                        let numPhone= part.dataValues.telephone,
                            message =`Votre structure ${part.dataValues.denomination} vient d etre enregistree avec succes. IM Gerant: ${code_partenaire+ '-' + code_us} Merci.`
                        const url = `https://api2.dream-digital.info/api/SendSMS?api_id=API12506297241&api_password=x3McB19tzd&sms_type=T&encoding=T&sender_id=FINUSECO&phonenumber=${numPhone}&textmessage= ${message}`
                        const response = await axios.get(url);
                    })
                }
            });
            return 'r'
        } catch (error) {
            res.send('Erreur '+ error)
        }
    },
    find_gerant : async (Part)=>{
        let partenaire
        if(Part.rep == true) {
            const [part, metada] = await sequelize.query("SELECT users.*,partenaires.denomination,partenaires.id_national id_nat,partenaires.rccm_f rccm,partenaires.id id_org,type_piece_identites.libelle typee FROM users INNER JOIN membres ON membres.id_user=users.id INNER JOIN type_piece_identites ON type_piece_identites.id=users.id_type_piece_ident INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN partenaires ON partenaires.id=partenaire_membres.id_partenaire WHERE membres.id_type_membre=6")
            partenaire = JSON.parse(JSON.stringify(part))
        }else{
            const [part, metada] = await sequelize.query("SELECT users.*,partenaire_membres.id_partenaire id_part,membres.id id_memb,etat_civils.libelle lb FROM users INNER JOIN etat_civils ON etat_civils.id=users.id_etat_civil INNER JOIN membres ON membres.id_user=users.id INNER JOIN type_membres ON type_membres.id=membres.id_type_membre INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id WHERE users.numero_piece=:num_piece AND users.id_type_piece_ident=:id_type AND type_membres.id=6",
            {
                replacements: { num_piece :Part.num_piece, id_type:Part.type_piece} 
            });
            partenaire = JSON.parse(JSON.stringify(part))
        }
        return partenaire
    },
    find_user : async (Part)=>{
        let user = ''
        const [part, metad] = await sequelize.query("SELECT users.*,etat_civils.libelle lb,partenaire_membres.etat_user etat,partenaire_membres.id_partenaire id_part,type_membres.type_membre libelle,type_membres.id id_type FROM users INNER JOIN membres ON membres.id_user=users.id INNER JOIN type_membres ON type_membres.id=membres.id_type_membre INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN partenaires ON partenaires.id=partenaire_membres.id_partenaire INNER JOIN etat_civils ON etat_civils.id=users.id_etat_civil WHERE users.numero_piece=:num_piece AND users.id_type_piece_ident=:id_type",
        {
            replacements: { num_piece :Part.num_piece, id_type:Part.type_piece} 
        })
        user = JSON.parse(JSON.stringify(part))

        if(user == ''){
            const [employe, metada] = await sequelize.query("SELECT users.*,employes.etat_user etat,etat_civils.libelle lb,type_employes.libelle,type_employes.id id_type FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_type_employe INNER JOIN etat_civils ON etat_civils.id=users.id_etat_civil WHERE users.numero_piece=:num_piece AND users.id_type_piece_ident=:id_type",
            {
                replacements: { num_piece :Part.num_piece, id_type:Part.type_piece} 
            })
            user = JSON.parse(JSON.stringify(employe))
        }
        return user
    },
    find_organisation : async (Part)=>{
        const [part, metada] = await sequelize.query("SELECT partenaires.* FROM partenaires WHERE partenaires.id=:id",
        {
            replacements: { id :Part.id } 
        }),
        partenaire = JSON.parse(JSON.stringify(part))
        return partenaire
    }, 
    rep_part : async ()=>{
        const [part, metada] = await sequelize.query("SELECT partenaires.id,partenaires.prenom,partenaires.nom,partenaires.postnom,partenaires.sexe,partenaires.telephone,partenaires.denomination FROM partenaires INNER JOIN partenaires ON partenaires.id=partenaires.id_partenaire"),
              partenaire = JSON.parse(JSON.stringify(part))
        return partenaire
    },
    find_pseudo : async (pseudo)=>{
        const [part, metada] = await sequelize.query("SELECT users.pseudo ps FROM users WHERE users.pseudo=:ps",
            {
                replacements: { ps : pseudo}
            });
            partenaire = JSON.parse(JSON.stringify(part))
        return partenaire
    },
    nb_user : async ()=>{
        const [utilisateur, metada] = await sequelize.query("SELECT COUNT(users.id) nb FROM users"),
              utilisateur_ = JSON.parse(JSON.stringify(utilisateur))
        return utilisateur_[0].nb
    }
};
