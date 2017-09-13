'use strict';
module.exports = function(sequelize, DataTypes) {
  var Detils = sequelize.define('Detils', {
    harga: DataTypes.INTEGER,
    jml_beli: DataTypes.INTEGER,
    sub_total: DataTypes.INTEGER,
    TransaksisId: DataTypes.INTEGER,
    BarangsId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Detils;
};