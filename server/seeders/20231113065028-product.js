"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "tshirt polos",
        price: 95000,
        total_stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "tshirt motif",
        price: 125000,
        total_stock: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "tshirt stripe",
        price: 105000,
        total_stock: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
