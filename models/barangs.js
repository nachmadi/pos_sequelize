'use strict';
module.exports = function(sequelize, DataTypes) {
  var Barangs = sequelize.define('Barangs', {
    nama_barang: DataTypes.STRING,
    satuan: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Barangs;
};