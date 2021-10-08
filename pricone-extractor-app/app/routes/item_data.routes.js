module.exports = app => {
    const item_datas = require("../controllers/item_data.controller.js");
    const equipment_data = require("../controllers/equipment_data.controller.js");
    const converter =  require("../sql2json/converter.js");
    var router = require("express").Router();

    
    // Retrieve all item_datas
    router.get("/", converter.convertEquipment);
    router.get("/unit_promotion", converter.convertUnitPromotion);
    app.use('/api/item_datas', router);
  };