module.exports = (sequelize, Sequelize) => {
    //"item_id","name","promotion_level","description","0","equipment_enhance_point","sell","craft_flg","{dataint:[hp,phyatk, magic_str,def,magic_def,physical_critical,magic_critical,wave_hp_recovery,wave_energy_recovery,dodge,physical_penetrate,magic_penetrate,life_steal,hp_recovery_rate,energy_recovery_rate,energy_reduce_rate,enable_donation,accuracy",
      const Equipment_Enhance_Rate = sequelize.define("equipment_enhance_rate", {
        equipment_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        equipment_name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        promotion_level: {
          type: Sequelize.INTEGER
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
        accuracy: {
            type: Sequelize.REAL
        }       
      },
      {
        timestamps: false
      });
    
      return Equipment_Enhance_Rate;
    };