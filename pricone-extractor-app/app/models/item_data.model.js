module.exports = (sequelize, Sequelize) => {
  //"item_id","name","promotion_level","description","0","equipment_enhance_point","sell","craft_flg","{dataint:[hp,phyatk, magic_str,def,magic_def,physical_critical,magic_critical,wave_hp_recovery,wave_energy_recovery,dodge,physical_penetrate,magic_penetrate,life_steal,hp_recovery_rate,energy_recovery_rate,energy_reduce_rate,enable_donation,accuracy",
    const Item_Data = sequelize.define("item_data", {
      item_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      promotion_level: {
        type: Sequelize.INTEGER
      },
      item_type: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      limit_num: {
        type: Sequelize.INTEGER
      },
      gojuon_order: {
        type: Sequelize.INTEGER
      },
      sell_check_disp : {
        type: Sequelize.INTEGER
      },
      start_time: {
        type: Sequelize.STRING
      },
      end_time: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    });
  
    return Item_Data;
  };