/*CREATE TABLE 'skill_data' (
    'skill_id' INTEGER NOT NULL, 
    'name' TEXT , 
    'skill_type' INTEGER NOT NULL, 
    'skill_area_width' INTEGER NOT NULL, 
    'skill_cast_time' REAL NOT NULL, 
    'boss_ub_cool_time' REAL NOT NULL, 
    'action_1' INTEGER NOT NULL, 
    'action_2' INTEGER NOT NULL, 
    'action_3' INTEGER NOT NULL, 
    'action_4' INTEGER NOT NULL, 
    'action_5' INTEGER NOT NULL, 
    'action_6' INTEGER NOT NULL, 
    'action_7' INTEGER NOT NULL, 
    'depend_action_1' INTEGER NOT NULL, 
    'depend_action_2' INTEGER NOT NULL, 
    'depend_action_3' INTEGER NOT NULL, 
    'depend_action_4' INTEGER NOT NULL, 
    'depend_action_5' INTEGER NOT NULL, 
    'depend_action_6' INTEGER NOT NULL, 
    'depend_action_7' INTEGER NOT NULL,
    'description' TEXT NOT NULL, 
    'icon_type' INTEGER NOT NULL, PRIMARY KEY('skill_id'));
;*/

    module.exports = (sequelize, Sequelize) => {   
        const Skill_Data = sequelize.define("skill_data", {
          skill_id:{
              type: Sequelize.INTEGER,
              primaryKey: true
          },
          name: {
            type: Sequelize.STRING,
          },
          skill_type: {
              type: Sequelize.INTEGER
          },
          skill_area_width: {
            type: Sequelize.INTEGER
          },
          skill_cast_time: {
            type: Sequelize.REAL
          },
          boss_ub_cool_time: {
            type: Sequelize.REAL
          },
          action_1: {
              type: Sequelize.INTEGER
          },
          action_2: {
              type: Sequelize.INTEGER
          },
          action_3: {
              type: Sequelize.INTEGER
          },
          action_4: {
            type: Sequelize.INTEGER
          },
          action_5: {
            type: Sequelize.INTEGER
          },
          action_6: {
            type: Sequelize.INTEGER
          },
          action_7: {
            type: Sequelize.INTEGER
          },
          depend_action_1: {
              type: Sequelize.INTEGER
          },
          depend_action_2: {
            type: Sequelize.INTEGER
          },
          depend_action_3: {
            type: Sequelize.INTEGER
          },
          depend_action_4: {
            type: Sequelize.INTEGER
          },
          depend_action_5: {
            type: Sequelize.INTEGER
          },
          depend_action_6: {
            type: Sequelize.INTEGER
          },
          depend_action_7: {
            type: Sequelize.INTEGER
          },         
          description: {
            type: Sequelize.STRING
          },
          icon_type:{
              type: Sequelize.INTEGER
          }         
        },
        {
          timestamps: false
        });
      
        return Skill_Data;
  };