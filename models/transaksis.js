'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaksis = sequelize.define('Transaksis', {
    trans_tgl: DataTypes.STRING,
    trans_total: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  });
  Transaksis.associate = function(models){
          Transaksis.belongsTo(models.Users);
          Transaksis.belongsToMany(models.Barangs, {
              through: "Detils"
           })

          //Transaksis.hasMany(models.);
    }
    return Transaksis;
};
