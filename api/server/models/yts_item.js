'use strict';
module.exports = (sequelize, DataTypes) => {
  const YtsItems = sequelize.define('YtsItems', {
    id: {
      field: 'id',
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    uid: {
      field: 'uid',
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID
    },
    videoId: {
      field: 'video_id',
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    title: {
      field: 'title',
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      field: 'description',
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumbnailsDefaultUrl: {
      field: 'thumbnails_default_url',
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnailsMediumUrl: {
      field: 'thumbnails_medium_url',
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnailsHighUrl: {
      field: 'thumbnails_high_url',
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnailsStandardUrl: {
      field: 'thumbnails_standard_url',
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnailsMaxresUrl: {
      field: 'thumbnails_maxres_url',
      type: DataTypes.STRING,
      allowNull: true,
    },
    href: {
      field: 'href',
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      field: 'duration',
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      field: 'views',
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      field: 'is_active',
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isWatched: {
      field: 'is_watched',
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    channelRef: {
      field: 'channel_ref',
      type: DataTypes.UUID,
      allowNull: false,
    },
    publishedAt: {
      field: 'published_at',
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    tableName: 'YtsItems',
    timestamps: true,
    underscored: true
  });
  YtsItems.associate = function(models) {
    YtsItems.belongsTo(models.YtsChannels, {
      foreignKey: 'channelRef',
      onDelete: 'CASCADE',
    });
  };
  return YtsItems;
};
