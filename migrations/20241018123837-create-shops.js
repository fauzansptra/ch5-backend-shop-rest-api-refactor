"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Shops", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      adminEmail: {
type:Sequelize.STRING,
unique:true,
validate:{
  isEmail:true
}
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          len: [4, 100],
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products", 
          key: 'id',
        },
      },
      userId: {
        // allowNull:false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Shops");
  },
};
