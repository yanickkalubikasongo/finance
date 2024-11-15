const router = require('express').Router();
const {
    create,
    repertoire,
    rep_transaction,
    create_poucentage_depot,
    select_poucentage_depot,
    send_pourcentage,
    on_agence,
    update,
    on_transaction,
    update_transaction,
    rep_province,
    rep_type_piece,
    rep_type_membre,
    create_monnaie,
    wallet_revenu,
    send_depot_wallet_don,
    wallet_don,
    rep_charge,
    send_payement,
    solde_agence,
    rep_etat_civil 
} = require('../controllers/AgenceController'); 

router.post('/solde_agence',solde_agence);
router.post('/send_payement',send_payement);
router.post('/send_depot_wallet_don',send_depot_wallet_don);
router.post('/rep_charge',rep_charge);
router.post('/create_monnaie',create_monnaie);
router.post('/wallet_revenu',wallet_revenu);
router.post('/wallet_don',wallet_don); 
router.post('/create',create);
router.post('/update',update);
router.post('/repertoire',repertoire);
router.post('/rep_transaction',rep_transaction);
router.post('/on_transaction',on_transaction);
router.post('/create_poucentage_depot',create_poucentage_depot);
router.post('/select_poucentage_depot',select_poucentage_depot);
router.post('/send_pourcentage',send_pourcentage);
router.post('/on_agence',on_agence);
router.post('/update_transaction',update_transaction);
router.post('/rep_province',rep_province);
router.post('/rep_type_piece',rep_type_piece);
router.post('/rep_type_membre',rep_type_membre);
router.post('/rep_etat_civil',rep_etat_civil);

module.exports = router;
