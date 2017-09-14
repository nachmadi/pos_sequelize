'use strict';
var utility = require('../helper/util.js');
// var tools = require('../helper/encrypter.js');

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: function (value,next){
          console.log(value)
          Users.find({where:{user_name:value}})
          .then(function(username){
            if(username){
              return next('Username sudah digunakan!')
            }else{
              return next()
            }
          })
          .catch(err=>{
            return next(err)
          })
        }
      }
    },
    user_pass: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING,
    deposito: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (callBackObjekIni) => {
        /*
        let plus = tools.rand();
        let pass = tools.crypt(callBackObjekIni,plus);
        let objPass = {password:pass,salt:plus}
        */
        let newPass = utility.getMd5(callBackObjekIni.user_pass+callBackObjekIni.salt);
        callBackObjekIni.user_pass = newPass;
      }
    }
  });
  Users.associate = function(models){
      Users.hasMany(models.Transaksis)
  }
  return Users;
};
