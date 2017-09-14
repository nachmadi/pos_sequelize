'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    harga: DataTypes.INTEGER,
    jml_beli: DataTypes.INTEGER,
    sub_total: DataTypes.INTEGER,
    TransaksisId: DataTypes.INTEGER,
    BarangId: DataTypes.INTEGER
  });
  
  Item.associate = function(models){
      Item.belongsTo(models.Barangs);
      // Detils.belongsTo(models.Barangs);
  }
  return Item;
};
