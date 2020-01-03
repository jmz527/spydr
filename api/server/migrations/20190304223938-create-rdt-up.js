'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RdtUps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      uid: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      user_ref: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        onDelete: 'CASCADE',
        references: {
          model: 'RdtUsers',
          key: 'uid',
          as: 'user_ref',
        },
      },
      rdt_ref: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        onDelete: 'CASCADE',
        references: {
          model: 'RdtItems',
          key: 'uid',
          as: 'rdt_ref',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RdtUps');
  }
};