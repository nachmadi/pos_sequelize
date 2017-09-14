'use strict';
module.exports = function(sequelize, DataTypes) {
  var Barangs = sequelize.define('Barangs', {
    nama_barang: DataTypes.STRING,
    satuan: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    stok: DataTypes.INTEGER
  });
  Barangs.associate = function(models){
        Barangs.belongsToMany(models.Transaksis, {
            through : "Detils"
         })
        Barangs.hasMany(models.Item);
  }
  return Barangs;
};
