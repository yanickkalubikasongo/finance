const {sequelize,Op,Agence,Monnaie_electronique,Config_transaction,Configuration_generale,Province,Type_piece_identite,etat_civil,Portef_don,Paiement} = require('../config/db');
const fs = require('fs')
const ShortUniqueId = require('short-unique-id');
const personnelService = require('../services/personnel.service');

module.exports={
    select_frais_depot: async (data)=>{
        const [frais, metadata_] = await sequelize.query("SELECT config_transactions.frais f,MAX(config_transactions.minimum) FROM config_transactions WHERE config_transactions.minimum <=:val AND config_transactions.devise='CDF' AND config_transactions.type='Depot'",
        {
            replacements: { val:data.montant }
        }); 
        const frais_ = JSON.parse(JSON.stringify(frais))
        return frais_
    },
    generateRefOperation: ()=>{
        const refOperationPartOne = new ShortUniqueId({ length: 5 });
        const refOperationPartTwo = new ShortUniqueId({ length: 6 });
        return refOperationPartOne.rnd()+'-'+refOperationPartTwo.rnd();
    },
    send_payement:async function(data,user,agence){
        try {
            let msg = 0
               
            if( parseFloat(data.montant) <= parseFloat(await this.wallet_don(data.devise))){
                let id_compte = await this.check_compte(data),
                    state_us = ''
                
                if(id_compte[0].id_user != 0) state_us = await personnelService.check_state_user(id_compte[0].id_user )
                if(state_us == ''){
                    await Paiement.create({
                        id_agence       : agence,
                        montant         : data.montant,
                        id_charge       : data.motif,
                        id_user         : user,
                        devise          : data.devise,
                        mois            : data.mois,
                        annee           : data.annee,
                        id_compte_monney: (data.motif == 3) ? id_compte[0].id : 0
                    });
                }else{
                    if(state_us[0].etat_user == 1){
                        await Paiement.create({
                            id_agence       : agence,
                            montant         : data.montant,
                            id_charge       : data.motif,
                            id_user         : user,
                            devise          : data.devise,
                            mois            : data.mois,
                            annee           : data.annee,
                            id_compte_monney: (data.motif == 3) ? id_compte[0].id : 0
                        });
                    }else{
                        msg = 1
                    }
                }
            } else msg = 2
                
            return msg
        } catch (error) {
            res.send('Erreur '+ error)
        }
    },
    check_payement: async (data)=>{
        const [pay, metadata_] = await sequelize.query("SELECT paiement_charges.* FROM  paiement_charges WHERE paiement_charges.mois=:mois AND paiement_charges.annee=:annee AND paiement_charges.id_charge=:id_charge",
        {
            replacements: { mois:data.mois, annee:data.annee, id_charge:data.motif }
        }); 
        const pay_ = JSON.parse(JSON.stringify(pay))
        return pay_
    },
    check_compte: async (data)=>{
        const [pay, metadata_] = await sequelize.query("SELECT compte_moneys.* FROM compte_moneys WHERE (CONCAT(LPAD(compte_moneys.id_agence,4,1),'-',LPAD(compte_moneys.id,11,1)))=:compte",
        {
            replacements: { compte:data.compte }
        }); 
        const pay_ = JSON.parse(JSON.stringify(pay))
        return pay_
    },
    somme_monnaie_electronique: async (agence,devise)=>{
        const [somme_monn_electro, metadata_] = await sequelize.query("SELECT SUM(monnaie_electroniques.montant) n FROM monnaie_electroniques WHERE monnaie_electroniques.devise=:devise AND monnaie_electroniques.id_agence=:id_agence",
        {
            replacements: { id_agence:agence,devise:devise }
        }),
        somme_monn_electro_ = JSON.parse(JSON.stringify(somme_monn_electro))
        return somme_monn_electro_
    },
    somme_depot_monnaie_electronique: async (agence,devise)=>{
        const [somme_depot_monnaie_electronique, metadata] = await sequelize.query("SELECT SUM(depots.montant_depose) n FROM depots WHERE depots.devise=:devise AND depots.point_cash_id=:id_agence",
        {
            replacements: { id_agence:agence,devise:devise }
        }); 
        const somme_depot_monnaie_electronique_ = JSON.parse(JSON.stringify(somme_depot_monnaie_electronique))
        return somme_depot_monnaie_electronique_
    },
    somme_retrait_monnaie_electronique: async (agence,devise)=>{
        const [somme_retrait_monnaie_electronique, metada_] = await sequelize.query("SELECT SUM(retraits.montant_retire) n FROM retraits INNER JOIN users ON users.id=retraits.id_user INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE retraits.devise=:devise AND retraits.point_cash_id=:id_agence AND type_employes.id<>8",
        {
            replacements: { id_agence:agence,devise:devise }
        }),
        somme_retrait_monnaie_electronique_ = JSON.parse(JSON.stringify(somme_retrait_monnaie_electronique))
        return somme_retrait_monnaie_electronique_
    },
    solde_monnaie_electronique_agence: async function (agence,devise){

        let somme_monn_electro_ = await this.somme_monnaie_electronique(agence,devise),
            somme_retrait_ = await this.somme_retrait_monnaie_electronique(agence,devise),
            somme_depot_ = await this.somme_depot_monnaie_electronique(agence,devise),

            r1= (somme_monn_electro_[0].n == null) ? 0 : somme_monn_electro_[0].n,
            r2= (somme_retrait_[0].n == null) ? 0 : somme_retrait_[0].n,
            r3= (somme_depot_[0].n == null) ? 0 : somme_depot_[0].n

        return [(parseFloat(r1) + parseFloat(r2)) - parseFloat(r3)]
    },
    create_monnaie:async function(data){
        await Monnaie_electronique.create({
            id_agence : data.agence,
        	montant   : data.montant,
        	devise    : data.devise
        });
        return 'r'
    },
    send_depot_wallet_don:async function(data){
        await Portef_don.create({
            type_operation : 'D',
            montant        : data.montant,
            devise         : data.devise
        });
        return 'r'
    },
    create:async function(data){
        await Agence.create({
            denomination : data.denomination,
            telephone    : data.telephone,
            avenue       : data.avenue,
            quartier     : data.quartier,
            numero_parcel: data.ref_parcelle,
            commune      : data.commune
        });
        return 'r'
    },
    users: async ()=>{
        const [user, metadata] = await sequelize.query("SELECT COUNT(users.id) n FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE type_employes.id=2"); 
        const users_ = JSON.parse(JSON.stringify(user)) 
        return users_[0].n
    },
    gestionnaire_credit: async ()=>{
        const [user, metadata] = await sequelize.query("SELECT COUNT(users.id) n FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE type_employes.id=5"); 
        const users_ = JSON.parse(JSON.stringify(user)) 
        return users_[0].n
    },
    prepose: async ()=>{
        const [user, metadata] = await sequelize.query("SELECT COUNT(users.id) n FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE type_employes.id=3"); 
        const users_ = JSON.parse(JSON.stringify(user)) 
        return users_[0].n
    },
    nb_agence: async ()=>{
        const [agence, metadata] = await sequelize.query("SELECT COUNT(agences.id) n FROM agences"); 
        const agence_ = JSON.parse(JSON.stringify(agence)) 
        return agence_[0].n
    },
    compte_epargne: async ()=>{
        const [epargne, metadata] = await sequelize.query("SELECT COUNT(compte_moneys.id) n FROM compte_moneys WHERE compte_moneys.type_compte='Epargne'"); 
        const epargne_ = JSON.parse(JSON.stringify(epargne)) 
        return epargne_[0].n
    },
    compte_courant: async ()=>{
        const [courant, metadata] = await sequelize.query("SELECT COUNT(compte_moneys.id) n FROM compte_moneys WHERE compte_moneys.type_compte='Courant'"); 
        const courant_ = JSON.parse(JSON.stringify(courant)) 
        return courant_[0].n
    },
    agent_agence: async ()=>{
        const [agent_agence, metadata] = await sequelize.query("SELECT COUNT(users.id) n FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE type_employes.id=4"); 
        const agent_agence_ = JSON.parse(JSON.stringify(agent_agence)) 
        return agent_agence_[0].n
    },
    agent_terrain: async ()=>{
        const [agent_terrain, metadata] = await sequelize.query("SELECT COUNT(users.id) n FROM users INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE type_employes.id=8"); 
        const agent_terrain_ = JSON.parse(JSON.stringify(agent_terrain)) 
        return agent_terrain_[0].n
    },
    membres: async ()=>{
        const [part, metada] = await sequelize.query("SELECT COUNT(DISTINCT membres.id) n FROM membres INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN partenaires ON partenaires.id=partenaire_membres.id_partenaire WHERE membres.id_type_membre=7"),
        partenaire = JSON.parse(JSON.stringify(part))
        return partenaire[0].n
    },
    membre_actif: async ()=>{
        const [part, metada] = await sequelize.query("SELECT COUNT(DISTINCT users.id) n FROM membres INNER JOIN type_membres ON type_membres.id=membres.id_type_membre INNER JOIN partenaire_membres ON partenaire_membres.id_membre=membres.id INNER JOIN partenaires ON partenaire_membres.id_partenaire=partenaires.id INNER JOIN users ON users.id=membres.id_user INNER JOIN compte_moneys ON compte_moneys.id_user=users.id WHERE type_membres.id=7"),
        partenaire = JSON.parse(JSON.stringify(part))
        return partenaire[0].n
    },
    nb_partenaire: async ()=>{
        const [agence, metadata] = await sequelize.query("SELECT COUNT(partenaires.id) n FROM partenaires"); 
        const agence_ = JSON.parse(JSON.stringify(agence)) 
        return agence_[0].n
    },
    rep_charge: async ()=>{
        const [charge, metadata] = await sequelize.query("SELECT * FROM charges"); 
        const charge_ = JSON.parse(JSON.stringify(charge))
        return charge_
    },
    somme_frais_retrait_enreg_par_agents_agence: async (devise)=>{
        const [somme_frais_retrait_agents_agence, metadata_] = await sequelize.query("SELECT SUM(((retraits.montant_retire*retraits.pourc_preleve)/100)) n FROM retraits INNER JOIN config_generales ON config_generales.id=retraits.id_config_general INNER JOIN users ON users.id=retraits.id_user INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE retraits.devise=:devise AND type_employes.id<>8",
        {
            replacements: {devise:devise }
        }),
        somme_frais_retrait_agents_agence_ = JSON.parse(JSON.stringify(somme_frais_retrait_agents_agence))
        return somme_frais_retrait_agents_agence_
    },
    somme_frais_transfert_enreg_par_agents_agence: async (devise)=>{
        const [somme_frais_transfert_agents_agence, metadata_] = await sequelize.query("SELECT SUM(((transferts.montant_envoye*transferts.pourc_preleve)/100)) n FROM transferts INNER JOIN config_generales ON config_generales.id=transferts.id_config_general INNER JOIN users ON users.id=transferts.id_user INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_type_employe WHERE transferts.devise=:devise AND type_employes.id<>8",
        {
            replacements: {devise:devise }
        }),
        somme_frais_transfert_agents_agence_ = JSON.parse(JSON.stringify(somme_frais_transfert_agents_agence))
        return somme_frais_transfert_agents_agence_
    },
    somme_frais_retrait_enreg_par_agents_terrain: async (devise)=>{
        const [somme_frais_retrait_agents_agence, metadata_] = await sequelize.query("SELECT SUM((((retraits.montant_retire*retraits.pourc_preleve)/100)/config_generales.retrocession_agent )*(config_generales.retrocession_agent -1)) n FROM retraits INNER JOIN config_generales ON config_generales.id=retraits.id_config_general INNER JOIN users ON users.id=retraits.id_user INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_user WHERE retraits.devise=:devise AND  type_employes.id=8",
        {
            replacements: {devise:devise }
        }),
        somme_frais_retrait_agents_agence_ = JSON.parse(JSON.stringify(somme_frais_retrait_agents_agence))
        return somme_frais_retrait_agents_agence_
    },
    somme_frais_transfert_enreg_par_agents_terrain: async (devise)=>{
        const [somme_frais_transfert_agents_terrain, metadata_] = await sequelize.query("SELECT SUM((((transferts.montant_envoye*transferts.pourc_preleve)/100)/config_generales.retrocession_agent )*(config_generales.retrocession_agent -1)) n FROM transferts INNER JOIN config_generales ON config_generales.id=transferts.id_config_general INNER JOIN users ON users.id=transferts.id_user INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_user WHERE transferts.devise=:devise AND  type_employes.id=8",
        {
            replacements: {devise:devise }
        }),
        somme_frais_transfert_agents_terrain_ = JSON.parse(JSON.stringify(somme_frais_transfert_agents_terrain))
        return somme_frais_transfert_agents_terrain_
    },
    somme_frais_depot_enreg_par_agents_terrain: async (devise)=>{
        const [ somme_frais_depot, metadata_] = await sequelize.query("SELECT SUM((((depots.montant_depose*depots.pourc_preleve)/100)/config_generales.retrocession_agent )*(config_generales.retrocession_agent -1)) n FROM depots INNER JOIN config_generales ON config_generales.id=depots.id_config_general INNER JOIN users ON users.id=depots.id_user INNER JOIN employes ON employes.id_user=users.id INNER JOIN type_employes ON type_employes.id=employes.id_user WHERE depots.devise=:devise AND type_employes.id=8",
        {
            replacements: {devise:devise }
        }),
        somme_frais_depot_ = JSON.parse(JSON.stringify(somme_frais_depot))
        return  somme_frais_depot_
    },
    wallet_revenu: async function (devise){
        try{
            // Les entrées 

            let somme_frais_retrait_enreg_aa = await this.somme_frais_retrait_enreg_par_agents_agence(devise), // revenus des retraits générés par l'agent agence
                somme_frais_transfert_enreg_aa = await this.somme_frais_transfert_enreg_par_agents_agence(devise), // revenus des transferts générés par l'agent agence
                somme_frais_retrait_enreg_at = await this.somme_frais_retrait_enreg_par_agents_terrain(devise), // revenus des retraits générés par l'agent terrain
                somme_frais_transfert_enreg_at = await this.somme_frais_transfert_enreg_par_agents_terrain(devise), // revenus des retraits générés par l'agent terrain
                somme_paiement_im = await this.somme_im(devise), // revenus des paiement IM effectués par les partenaires

            // Les sorties

                somme_frais_depot_agent_terrain = await this.somme_frais_depot_enreg_par_agents_terrain(devise), // revenus des dépôts générés par l'agent terrain
                entree_don = await this.entres_portefeuille_don(devise) // Entrées du partefeuille Don

            let r1 = 0,
                r2 = 0,
                r3 = 0,
                r4 = 0, 
                r5 = 0,
                r6 = 0,
                r7 = 0
                
            if( somme_frais_retrait_enreg_aa[0].n != null) r1 = somme_frais_retrait_enreg_aa[0].n
            if( somme_frais_transfert_enreg_aa[0].n != null) r2 = somme_frais_transfert_enreg_aa[0].n 
            if( somme_frais_retrait_enreg_at[0].n != null) r3 = somme_frais_retrait_enreg_at[0].n 
            if( somme_frais_transfert_enreg_at[0].n != null) r4 = somme_frais_transfert_enreg_at[0].n
            if( somme_paiement_im != null) r5 = somme_paiement_im
            if( somme_frais_depot_agent_terrain[0].n != null) r6 = somme_frais_depot_agent_terrain[0].n 
            if( entree_don[0].nb_d != null) r7 = entree_don[0].nb_d

            console.log("****************************************************************** R1 "+ r1)
            console.log("****************************************************************** R2 "+ r2)
            console.log("****************************************************************** R3 "+ r3)
            console.log("****************************************************************** R4 "+ r4)
            console.log("****************************************************************** R5 "+ r5)
            console.log("****************************************************************** R6 "+ r6)
            
            return [ ((parseFloat(r1) + parseFloat(r2) + parseFloat(r3) + parseFloat(r4) + parseFloat(r5)) - (parseFloat(r6) + parseFloat(r7))) ] 
        }catch (error) {
            res.send('Erreur '+ error)
        }
    },
    entres_portefeuille_don: async (devise)=>{
        const [entres_portefeuille_don, metadata_] = await sequelize.query("SELECT SUM(operation_portefeuile_dons.montant) nb_d FROM operation_portefeuile_dons WHERE operation_portefeuile_dons.devise=:devise",
        {
            replacements: {devise:devise }
        }),
        entres_portefeuille_don_ = JSON.parse(JSON.stringify(entres_portefeuille_don))
        
        return entres_portefeuille_don_
    },
    autres_sorties_portefuielle_don: async (devise)=>{
        const [paiement, metadata] = await sequelize.query("SELECT SUM(paiement_charges.montant) n FROM paiement_charges WHERE paiement_charges.devise=:devise",
        {
            replacements: {devise:devise }
        }),
        paiement_ = JSON.parse(JSON.stringify(paiement))
        
        return paiement_
    },
    wallet_don: async function (devise){

        let entree_don = await this.entres_portefeuille_don(devise),
            autres_sorties = await this.autres_sorties_portefuielle_don(devise)
        
        let r1 = 0,
            r2 = 0
            
        if( entree_don[0].nb_d != null) r1 = entree_don[0].nb_d
        if( autres_sorties[0].n != null) r2 = autres_sorties[0].n

        let somme = (parseFloat(r1) - parseFloat(r2))
        return somme
    },
    somme_entree_wallet_don: async (devise)=>{
        const [wallet_don_cdf_d, metadata_] = await sequelize.query("SELECT SUM(operation_portefeuile_dons.montant) nb_d FROM operation_portefeuile_dons WHERE operation_portefeuile_dons.devise=:devise AND operation_portefeuile_dons.type_operation='D'",
        {
            replacements: {devise:devise }
        }); 
        const wallet_don_cdf_d_ = JSON.parse(JSON.stringify(wallet_don_cdf_d))

        let r1 = 0
            
        if( wallet_don_cdf_d_[0].nb_d != null) r1 = wallet_don_cdf_d_[0].nb_d
        return r1
    },
    somme_im: async (devise)=>{
        let somme_im = 0,
            r1 = 0

        if(devise == 'EUR' || devise == 'USD'){
            const [somme, meta] = await sequelize.query("SELECT SUM(config_generales.prix_im) n FROM vente_ims INNER JOIN config_generales ON config_generales.id=vente_ims.id_config_generale WHERE vente_ims.devise=:devise",
            {
                replacements: {devise:devise }
            })
            somme_im = JSON.parse(JSON.stringify(somme))
        }
        if(devise == 'CDF'){
            const [somme_, meta] = await sequelize.query("SELECT SUM(config_generales.prix_im*config_generales.taux_change) n FROM vente_ims INNER JOIN config_generales ON config_generales.id=vente_ims.id_config_generale WHERE vente_ims.devise=:devise",
            {
                replacements: {devise:devise }
            })
            somme_im = JSON.parse(JSON.stringify(somme_))
        }
            
        if( somme_im[0].n != null) r1 = somme_im[0].n
        return r1
    },
    somme_depot_cdf: async ()=>{
        const [wallet, metadata] = await sequelize.query("SELECT SUM((depots.montant_depose * depots.pourc_preleve)/100) n FROM depots WHERE depots.devise='CDF'"); 
        const wallet_ = JSON.parse(JSON.stringify(wallet))

        let r1 = 0
            
        if( wallet_[0].n != null) r1 = wallet_[0].n
        return r1
    },
    somme_depot_usd: async ()=>{
        const [wallet, metadata] = await sequelize.query("SELECT SUM((depots.montant_depose * depots.pourc_preleve)/100) n FROM depots WHERE depots.devise='USD'"); 
        const wallet_ = JSON.parse(JSON.stringify(wallet))

        let r1 = 0
            
        if( wallet_[0].n != null) r1 = wallet_[0].n
        return r1
    },
    somme_depot_eur: async ()=>{
        const [wallet, metadata] = await sequelize.query("SELECT SUM((depots.montant_depose * depots.pourc_preleve)/100) n FROM depots WHERE depots.devise='EUR'"); 
        const wallet_ = JSON.parse(JSON.stringify(wallet))

        let r1 = 0
            
        if( wallet_[0].n != null) r1 = wallet_[0].n
        return r1
    },
    repertoire:async function(){
        return await Agence.findAll();
    },
    transac: async (dataTransaction)=>{
        let trans = await Config_transaction.findAll({
                where: { 
                    type  :dataTransaction.type,
                    devise:dataTransaction.devise
                }
            })
        return trans
    },
    create_poucentage_depot: async (dataTransaction)=>{
        await Config_transaction.create({
            minimum:dataTransaction.minimum,
            maximum:dataTransaction.maximum,
            frais  :dataTransaction.frais,
            type   :"Depot",
            devise :dataTransaction.devise
        });
        return 'r'
    },
    select_poucentage_depot: async ()=>{
        const [pourcentage, metadata_] = await sequelize.query("SELECT config_generales.* FROM config_generales ORDER BY config_generales.id DESC LIMIT 1"); 
        const pourcentage_ = JSON.parse(JSON.stringify(pourcentage))
        return pourcentage_
    },
    send_pourcentage: async (data)=>{
        let msg      =''

        const [confi, metadat_] = await sequelize.query("SELECT config_generales.* FROM config_generales WHERE config_generales.id=(SELECT MAX(config_generales.id) FROM config_generales)"),
        confi_ = JSON.parse(JSON.stringify(confi))
        
        if(confi_[0].penalite_remboursement == parseFloat(data.penalite).toFixed(2) && confi_[0].pourcentage_credit==parseFloat(data.credit).toFixed(2) && confi_[0].montant_maximal_emprunt==parseFloat(data.montant_max).toFixed(2) && confi_[0].prix_im==parseFloat(data.cout).toFixed(2) && confi_[0].taux_change==parseFloat(data.taux_change).toFixed(2) && confi_[0].retrocession_agent==parseFloat(data.agent).toFixed(2)){
           msg='repete'
        }
        else{
            await Configuration_generale.create({
                pourcentage_credit     :data.credit,
                retrocession_agent     :data.agent,
                prix_im                :data.cout,
                montant_maximal_emprunt:data.montant_max,
                penalite_remboursement :data.penalite,
                taux_change            :data.taux_change
            });
            msg='r'
        }
        return msg
    },
    on_agence: async (data)=>{
        let agence = await Agence.findAll({
            where: { id : data.id }
        })
        return agence
    },
    check_agence_for_log : async (data)=>{ 
        const [agence, meta] = await sequelize.query("SELECT agences.id FROM agences WHERE agences.denomination=:deno AND agences.numero_parcel=:num_par AND agences.commune=:commune AND agences.telephone=:telephone AND agences.avenue=:avenu AND agences.quartier=:quartier",
        {
            replacements: { 
                            deno     :data.denomination,
                            num_par  :data.ref_parcelle,
                            commune  :data.commune, 
                            telephone:data.telephone, 
                            avenu    :data.avenue, 
                            quartier :data.quartier
                        }
        }),
        agence_ = JSON.parse(JSON.stringify(agence))
        return agence_
    },
    update: async function(data,id_user){
        let msg='null'
        if(await this.check_agence_for_log(data) == ''){
            await Agence.update(
                { 
                    denomination :data.denomination,
                    numero_parcel:data.ref_parcelle,
                    commune      :data.commune,
                    telephone    :data.telephone,
                    avenue       :data.avenue,
                    quartier     :data.quartier
                }, 
                {
                where: { 
                    id : data.id 
                }
            });

            let donnees = {
                'id': data.id,
                'denomination' : data.denomination,
                'telephone': data.telephone,
                'avenue':data.avenue,
                'quartier':data.quartier,
                'numero_parcel':data.ref_parcelle,
                'commune':data.commune,
                'id_user':id_user,
                'date_': new Date().toISOString()
            },
            dat = fs.readFileSync('Logs/agence.json'),
            donnees_conversees = JSON.parse(dat)
            donnees_conversees.push(donnees)
            let nouveau =  JSON.stringify(donnees_conversees) 
            fs.writeFileSync('Logs/agence.json', nouveau , err=>{
                if(err) throw err
            })
            msg = 'r'
        }
        return msg
    },
    on_transaction: async (data)=>{
        let trans = await Config_transaction.findAll({
            where: { id : data.id }
        })
        return trans
    },
    check_config_transaction_for_log : async (data)=>{ 
        const [transac, meta] = await sequelize.query("SELECT config_transactions.id FROM config_transactions WHERE config_transactions.minimum=:mini AND config_transactions.maximum=:maxi AND config_transactions.frais=:frais AND config_transactions.type=:type AND config_transactions.devise=:devise",
        {
            replacements: { mini:data.min,maxi:data.max,frais:data.frais,type:data.type,devise:data.devise }
        }),
        transac_ = JSON.parse(JSON.stringify(transac))
        return transac_
    },
    update_transaction: async function (data,id_user){
        let msg = 'null'
        if(await this.check_config_transaction_for_log(data) == ''){
            await Config_transaction.update(
                { 
                    minimum:data.min,
                    maximum:data.max,
                    frais  :data.frais
                }, 
                {
                where: { 
                    id : data.id 
                }
            });
            let donnees = {
                'id' : data.id,
                'minimum': data.min,
                'maximum':data.max,
                'frais':data.frais,
                'type':'',
                'devise':'',
                'id_user':id_user,
                'opération':'Mise à jour',
                'date_': new Date().toISOString()
            },
            dat = fs.readFileSync('Logs/confTransaction.json'),
            donnees_conversees = JSON.parse(dat)
            donnees_conversees.push(donnees)
            let nouveau =  JSON.stringify(donnees_conversees) 
            fs.writeFileSync('Logs/confTransaction.json', nouveau , err=>{
                if(err) throw err
            })
            msg = 'r'
        }
        return msg
    },
    rep_province:async ()=>{
        let prov = await Province.findAll()
        return prov
    },
    rep_type_piece:async (id)=>{
        let type_piece = await Type_piece_identite.findAll()
        return type_piece
    },
    rep_type_membre:async()=>{
        const [type_membre, metadata_] = await sequelize.query("SELECT type_employes.* FROM type_employes WHERE type_employes.id<>1"); 
        const type_membre_ = JSON.parse(JSON.stringify(type_membre))
        return type_membre_
    },
    rep_type_membre_partenaire:async()=>{
        const [type_membre, metadata_] = await sequelize.query("SELECT type_membres.* FROM type_membres WHERE type_membres.id <> 7 "); 
        const type_membre_ = JSON.parse(JSON.stringify(type_membre))
        return type_membre_
    },
    rep_etat_civil:async function(){
        let type_piece = await etat_civil.findAll()
        return type_piece
    }
};