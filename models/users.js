'use strict';
var utility = require('../helper/util.js');

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    user_name: DataTypes.STRING,
    user_pass: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (callBackObjekIni) => {
        let newPass = utility.getMd5(callBackObjekIni.user_pass+callBackObjekIni.salt);
        callBackObjekIni.user_pass = newPass;
      }
    }  
  });
  return Users;
};
