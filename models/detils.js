'use strict';
module.exports = function(sequelize, DataTypes) {
  var Detils = sequelize.define('Detils', {
      harga: DataTypes.INTEGER,
      jml_beli: DataTypes.INTEGER,
      sub_total: DataTypes.INTEGER,
      TransaksisId: DataTypes.INTEGER,
      BarangsId: DataTypes.INTEGER
  });

  Detils.associate = function(models){
      Detils.belongsTo(models.Transaksis);
      Detils.belongsTo(models.Barangs);
  }

  return Detils;
};
