
module.exports = (sequelize, Sequelize) => {
    //"item_id","name","promotion_level","description","0","equipment_enhance_point","sell","craft_flg","{dataint:[hp,phyatk, magic_str,def,magic_def,physical_critical,magic_critical,wave_hp_recovery,wave_energy_recovery,dodge,physical_penetrate,magic_penetrate,life_steal,hp_recovery_rate,energy_recovery_rate,energy_reduce_rate,enable_donation,accuracy",
      const Equipment_Data = sequelize.define("equipment_data", {
        equipment_name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        promotion_level: {
          type: Sequelize.INTEGER
        },
        craft_flg:{
            type: Sequelize.INTEGER
        },
        equipment_enhance_point: {
            type: Sequelize.INTEGER
        },
        sale_price: {
            type : Sequelize.INTEGER
        },
        require_level: {
            type : Sequelize.INTEGER
        },
        hp: {
            type: Sequelize.REAL
        },
        atk: {
            type: Sequelize.REAL
        },
        magic_str: {
            type: Sequelize.REAL
        },
        def: {
            type: Sequelize.REAL
        },
        magic_def: {
            type: Sequelize.REAL
        },
        physical_critical: {
            type: Sequelize.REAL
        },
        magic_critical: {
            type: Sequelize.REAL
        },
        wave_hp_recovery: {
            type : Sequelize.REAL
        },
        wave_energy_recovery: {
            type: Sequelize.REAL
        },
        dodge: {
            type: Sequelize.REAL
        },
        physical_penetrate:{
            type: Sequelize.REAL
        },
        magic_penetrate:{
            type: Sequelize.REAL
        },
        life_steal: {
            type: Sequelize.REAL
        },
        hp_recovery_rate: {
            type: Sequelize.REAL
        },
        energy_recovery_rate: {
            type: Sequelize.REAL
        },
        energy_reduce_rate: {
            type: Sequelize.REAL
        },
        enable_donation:{
            type: Sequelize.INTEGER
        },
        accuracy: {
            type: Sequelize.REAL
        },
        display_item: {
            type: Sequelize.INTEGER
        },
        item_type: {
            type: Sequelize.INTEGER
        }
      },
      {
        timestamps: false
      });
    
      return Equipment_Data;
    };