"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "americano",
        price: 15000,
        total_stock: 10,
        image:
          "https://images.unsplash.com/photo-1581996323441-538096e854b9?q=80&w=2881&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "caffe latte",
        price: 25000,
        total_stock: 5,
        image:
          "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "cappucino",
        price: 25000,
        total_stock: 20,
        image:
          "https://images.unsplash.com/photo-1594261956806-3ad03785c9b4?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "lemon tea",
        price: 18000,
        total_stock: 20,
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "jasmine tea",
        price: 16000,
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
