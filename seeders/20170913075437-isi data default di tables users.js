'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
          user_name: "admin",
          user_pass: "871bb1c0c3c295c0978de273666c5784",
          role:"admin",
          salt:"123",
          createdAt:new Date(),
          updatedAt:new Date()
        }], {});
      },


  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
