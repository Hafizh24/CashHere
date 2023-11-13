"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "tshirt polos",
        price: 95000,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "tshirt motif",
        price: 125000,
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "tshirt stripe",
        price: 105000,
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
