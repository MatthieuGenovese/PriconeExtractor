module.exports = (sequelize, Sequelize) => {   
      const Unit_Promotion_Status = sequelize.define("unit_promotion_status", {
        unit_id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        promotion_level: {
          type: Sequelize.INTEGER,
          primaryKey: true
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
    
      return Unit_Promotion_Status;
};