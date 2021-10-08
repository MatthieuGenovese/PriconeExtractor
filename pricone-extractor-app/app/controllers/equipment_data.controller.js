const db = require("../models");
const Equipment_Data = db.equipment_data;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = () => {
    
    var dataReceived;
    Equipment_Data.findAll()
      .then(data => {
        dataReceived = data;
      })
      .catch(err => {
        err.message || "Some error occurred while retrieving tutorials."
      });
      return dataReceived;
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};