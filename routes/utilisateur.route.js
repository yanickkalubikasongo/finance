const router = require('express').Router();
const { accueil,ckeck_mdp } = require('../controllers/UtilisateurController');

router.get('/',accueil)
router.post('/ckeck_mdp',ckeck_mdp);
module.exports = router;
