const {sequelize,Op} = require('../config/db');
const fs = require('fs');

module.exports={
    nb_enregistrement:async function(entite){
        const [nb, metadata] = await sequelize.query("SELECT COUNT("+entite+".id) nb FROM "+entite+"");
        const nb_ = JSON.parse(JSON.stringify(nb))
        return nb[0].nb
    }
};