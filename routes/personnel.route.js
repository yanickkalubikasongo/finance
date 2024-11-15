const router = require('express').Router();
const { enreg_personnel,rep_personnel,change_state,on_personnel,update_personnel,rep_type_membre,profil_user } = require('../controllers/personnel.controller');

router.post('/enreg_personnel',enreg_personnel);
router.post('/change_state',change_state);
router.post('/rep_personnel',rep_personnel);
router.post('/on_personnel',on_personnel);
router.post('/update_personnel',update_personnel);
router.post('/rep_type_membre',rep_type_membre);
router.post('/profil_user',profil_user);

module.exports = router;