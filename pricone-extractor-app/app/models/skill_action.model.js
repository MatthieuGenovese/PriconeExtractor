/*CREATE TABLE 'skill_action' (
    'action_id' INTEGER NOT NULL, 
    'class_id' INTEGER NOT NULL, 
    'action_type' INTEGER NOT NULL, 
    'action_detail_1' INTEGER NOT NULL, 
    'action_detail_2' INTEGER NOT NULL, 
    'action_detail_3' INTEGER NOT NULL, 
    'action_value_1' REAL NOT NULL, 
    'action_value_2' REAL NOT NULL, 
    'action_value_3' REAL NOT NULL, 
    'action_value_4' REAL NOT NULL, 
    'action_value_5' REAL NOT NULL, 
    'action_value_6' REAL NOT NULL, 
    'action_value_7' REAL NOT NULL, 
    'target_assignment' INTEGER NOT NULL, 
    'target_area' INTEGER NOT NULL, 
    'target_range' INTEGER NOT NULL, 
    'target_type' INTEGER NOT NULL, 
    'target_number' INTEGER NOT NULL, 
    'target_count' INTEGER NOT NULL, 
    'description' TEXT NOT NULL, 
    'level_up_disp' TEXT NOT NULL, PRIMARY KEY('action_id'));
*/

    module.exports = (sequelize, Sequelize) => {   
        const Skill_Action = sequelize.define("skill_action", {
          action_id:{
              type: Sequelize.INTEGER,
              primaryKey: true
          },
          class_id: {
            type: Sequelize.INTEGER,
          },
          action_type: {
              type: Sequelize.INTEGER
          },
          action_detail_1: {
              type: Sequelize.INTEGER
          },
          action_detail_2: {
              type: Sequelize.INTEGER
          },
          action_detail_3: {
              type: Sequelize.INTEGER
          },
          action_value_1: {
              type: Sequelize.REAL
          },
          action_value_2: {
            type: Sequelize.REAL
          },
          action_value_3: {
            type: Sequelize.REAL
          },
          action_value_4: {
            type: Sequelize.REAL
          },
          action_value_5: {
            type: Sequelize.REAL
          },
          action_value_6: {
            type: Sequelize.REAL
          },
          action_value_7: {
            type: Sequelize.REAL
          },
          target_assignment: {
              type: Sequelize.INTEGER
          },
          target_area: {
            type: Sequelize.INTEGER
          },
          target_range: {
            type: Sequelize.INTEGER
          },
          target_type: {
            type: Sequelize.INTEGER
          },
          target_number: {
            type: Sequelize.INTEGER
          },
          target_count: {
              type: Sequelize.INTEGER
          },          
          description: {
            type: Sequelize.STRING
          },
          level_up_disp:{
              type: Sequelize.STRING
          }         
        },
        {
          timestamps: false
        });
      
        return Skill_Action;
  };