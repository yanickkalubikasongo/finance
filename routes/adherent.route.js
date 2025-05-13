const router = require('express').Router();
const {
    get_adherent_by_im_id_piece,
    create_compte,
    rep_compte
} = require('../controllers/adherentController');

router.post('/get_adherent_by_im_id_piece',get_adherent_by_im_id_piece);
router.post('/create_compte',create_compte);
router.post('/rep_compte',rep_compte);

module.exports = router;
