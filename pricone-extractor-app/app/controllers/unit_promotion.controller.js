const db = require("../models");
const Unit_Promotion = db.unit_promotion;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = () => {
    
    var dataReceived;
    Unit_Promotion.findAll()
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