const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.item_data = require("./item_data.model.js")(sequelize, Sequelize);
db.equipment_data = require("./equipment_data.model.js")(sequelize, Sequelize);
db.unit_promotion = require("./unit_promotion.model.js")(sequelize, Sequelize);
db.equipment_enhance_rate = require("./equipment_enhance_rate.model.js")(sequelize, Sequelize);
db.unit_promotion_status = require("./unit_promotion_status.model.js")(sequelize, Sequelize);
db.skill_data = require("./skill_data.model.js")(sequelize, Sequelize);
db.skill_action = require("./skill_action.model.js")(sequelize, Sequelize);
module.exports = db;