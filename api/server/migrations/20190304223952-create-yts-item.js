'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('YtsItems', {
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
      video_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      thumbnails_default_url: {
        type: Sequelize.STRING
      },
      thumbnails_medium_url: {
        type: Sequelize.STRING
      },
      thumbnails_high_url: {
        type: Sequelize.STRING
      },
      thumbnails_standard_url: {
        type: Sequelize.STRING
      },
      thumbnails_maxres_url: {
        type: Sequelize.STRING
      },
      href: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duration: {
        allowNull: true,
        type: Sequelize.STRING
      },
      views: {
        allowNull: true,
        type: Sequelize.STRING
      },
      is_active: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      is_watched: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      channel_ref: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'YtsChannels',
          key: 'uid',
          as: 'channel_ref',
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
    return queryInterface.dropTable('YtsItems');
  }
};
