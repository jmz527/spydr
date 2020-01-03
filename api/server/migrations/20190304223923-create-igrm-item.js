'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('IgrmItems', {
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
      pic_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      low_res_img: {
        allowNull: false,
        type: Sequelize.STRING
      },
      thumb_img: {
        allowNull: false,
        type: Sequelize.STRING
      },
      link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      loc: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cap: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      user_ref: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'IgrmUsers',
          key: 'uid',
          as: 'user_ref',
        },
      },
      published_at: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('IgrmItems');
  }
};
