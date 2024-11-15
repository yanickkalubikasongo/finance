const router = require('express').Router();
const { enreg_partenaire,find_gerant,find_organisation,find_user } = require('../controllers/partenaire.controller');

router.post('/enreg_partenaire',enreg_partenaire);
router.post('/find_gerant',find_gerant);
router.post('/find_user',find_user);
router.post('/find_organisation',find_organisation);

module.exports = router;