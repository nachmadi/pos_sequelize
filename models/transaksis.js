'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaksis = sequelize.define('Transaksis', {
    trans_tgl: DataTypes.STRING,
    trans_total: DataTypes.INTEGER,
    UsersId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Transaksis;
};