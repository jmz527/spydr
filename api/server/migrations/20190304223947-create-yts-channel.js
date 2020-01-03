'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('YtsChannels', {
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
      channel_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      channel: {
        allowNull: false,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      custom_url: {
        type: Sequelize.STRING
      },
      thumbnail_default_url: {
        type: Sequelize.STRING
      },
      thumbnail_medium_url: {
        type: Sequelize.STRING
      },
      thumbnail_high_url: {
        type: Sequelize.STRING
      },
      upload_playlist_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      view_count: {
        type: Sequelize.STRING
      },
      comment_count: {
        type: Sequelize.STRING
      },
      subscriber_count: {
        type: Sequelize.STRING
      },
      video_count: {
        type: Sequelize.STRING
      },
      is_active: {
        allowNull: false,
        default: true,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('YtsChannels');
  }
};
