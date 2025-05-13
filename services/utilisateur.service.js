const {sequelize,Connexion, Employe} = require('../config/db');
const fs     = require('fs')
const bcrypt = require("bcrypt");

module.exports={ 
    recuperation_id_mdp_oublie : async function(pseudo){
        const [rec_id, metadata] = await sequelize.query("SELECT employes.id FROM employes WHERE employes.pseudo = :ps",
        {
            replacements: { ps: pseudo }
        });
        const rec_id_ = JSON.parse(JSON.stringify(rec_id))
        return rec_id_
    },
    check_pseudo : async function(data){
        const [search, metadata] = await sequelize.query("SELECT employes.* FROM employes WHERE employes.pseudo = :ps",
        {
            replacements: { ps: data.pseudo }
        }),
        search_ = JSON.parse(JSON.stringify(search))
        return search_
    },
    create_new_mdp_ : async function(BodyRequest){
        await sequelize.transaction(async (t) => {
            let id = await this.recuperation_id_mdp_oublie(BodyRequest.pseudo),
                salt     = await bcrypt.genSalt(10),
                mdp_hash = await bcrypt.hash(BodyRequest.new_mdp,salt)

            await Employe.update({ mot_de_passe : mdp_hash, etat_mot_de_passe:1 }, {
                where: { pseudo : BodyRequest.pseudo }
            },{ transaction: t });
            
               donnees = {
                    'id' : id[0].id,
                    'nouveau_mot_de_passe': BodyRequest.new_mdp,
                    'action': 'Récupération mot de passe',
                    'date_': new Date().toISOString()
                },
                data = fs.readFileSync('Logs/compte.json'),
                donnees_conversees = JSON.parse(data)
            donnees_conversees.push(donnees)
            let nouveau =  JSON.stringify(donnees_conversees) 
            fs.writeFileSync('Logs/compte.json', nouveau , err=>{
                if(err) throw err
            })
        });
    },
    recuperation_mdp : async function(DataRecMdp){
        const [rec_mdp, metadata] = await sequelize.query("SELECT comptes.*, users.* FROM comptes,users WHERE comptes.id=users.id AND comptes.pseudo=:ps AND comptes.vehicule_prefere=:vp AND comptes.fruit_prefere=:fp AND comptes.date_ouverture=:datouv AND users.nom=:n AND users.email=:em AND users.prenom=:p AND users.telephone=:tel AND users.post_nom=:post",
        {
            replacements: { ps: DataRecMdp.pseudo, vp: DataRecMdp.voiture, fp: DataRecMdp.fruit, datouv : DataRecMdp.date_ouverture,n: DataRecMdp.nom, em : DataRecMdp.email, p: DataRecMdp.prenom, tel: DataRecMdp.telephone, post: DataRecMdp.postnom }
        });
        const rec_mdp_ = JSON.parse(JSON.stringify(rec_mdp))
        return rec_mdp_
    },
    check_pseudo_mdp_admin_plat : async function(pseudo_){
        const [cmtt, metadata_] = await sequelize.query("SELECT agences.id id_o, employes.id_type_employe typee,employes.pseudo, users.id id,employes.mot_de_passe mdp,employes.etat_mot_de_passe etat_mdp FROM users INNER JOIN employes ON users.id = employes.id_user INNER JOIN agences ON agences.id = employes.id_agence WHERE employes.pseudo LIKE BINARY :ps",
            {
                replacements: { ps: pseudo_ }
            }
        ); 
        const obj = JSON.parse(JSON.stringify(cmtt))
        return obj
    },
    connexion_administrateur : async function(pseudo){
        const [cmt, metadata_] = await sequelize.query("SELECT agences.id id_0,UPPER(agences.denomination) d, employes.id_type_employe typee,users.photo p, users.id id, employes.mot_de_passe mdp,users.* FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN agences ON agences.id=employes.id_agence WHERE employes.pseudo LIKE BINARY :ps",
        {
            replacements: { ps: pseudo }
        }); 
        const compte_ = JSON.parse(JSON.stringify(cmt))
        return compte_
    },
    create_connexion : async function(id_cmt){
        await Connexion.create({
            id_user        : id_cmt
        }) 
    },
    deconnexion_simple_user : async function(id_compte){ 
        const [conn, met] = await sequelize.query("SELECT connexions.id id FROM connexions WHERE connexions.id_user = :idcmt ORDER BY connexions.id DESC LIMIT 1",
        {
            replacements: { idcmt : id_compte }
        });
        const connexion_ = JSON.parse(JSON.stringify(conn))
        await Connexion.update({  date_heure_decon : new Date().toISOString().replace('Z', '').replace('T', ' ') }, {
            where: { id : connexion_[0].id }
        });
    }
};