'use strict';
module.exports = (sequelize, DataTypes) => {
  const YtsChannels = sequelize.define('YtsChannels', {
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
    channelId: {
      field: 'channel_id',
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    channel: {
      field: 'channel',
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      field: 'title',
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      field: 'description',
      type: DataTypes.TEXT,
    },
    customUrl: {
      field: 'custom_url',
      type: DataTypes.STRING,
    },
    thumbnailDefaultUrl: {
      field: 'thumbnail_default_url',
      type: DataTypes.STRING,
    },
    thumbnailMediumUrl: {
      field: 'thumbnail_medium_url',
      type: DataTypes.STRING,
    },
    thumbnailHighUrl: {
      field: 'thumbnail_high_url',
      type: DataTypes.STRING,
    },
    uploadPlaylistId: {
      field: 'upload_playlist_id',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    viewCount: {
      field: 'view_count',
      type: DataTypes.STRING,
    },
    commentCount: {
      field: 'comment_count',
      type: DataTypes.STRING,
    },
    subscriberCount: {
      field: 'subscriber_count',
      type: DataTypes.STRING,
    },
    videoCount: {
      field: 'video_count',
      type: DataTypes.STRING,
    },
    isActive: {
      field: 'is_active',
      allowNull: false,
      default: true,
      type: DataTypes.BOOLEAN
    },
    publishedAt: {
      field: 'published_at',
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    tableName: 'YtsChannels',
    timestamps: true,
    underscored: true
  });
  YtsChannels.associate = function(models) {
    // YtsChannels.hasMany(models.YtsItems,{
    //     as:'videos'
    // });
  };
  return YtsChannels;
};
