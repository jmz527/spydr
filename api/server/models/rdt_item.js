'use strict';
module.exports = (sequelize, DataTypes) => {
  const RdtItems = sequelize.define('RdtItems', {
    id: {
      field: 'id',
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    uid: {
      field: 'uid',
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    thingId: {
      field: 'thing_id',
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    fullname: {
      field: 'fullname',
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      field: 'title',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    href: {
      field: 'href',
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      field: 'author',
      type: DataTypes.STRING,
      allowNull: true,
    },
    subreddit: {
      field: 'subreddit',
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      field: 'url',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    commentsCount: {
      field: 'comments_count',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      field: 'score',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publishedAt: {
      field: 'published_at',
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    tableName: 'RdtItems',
    timestamps: true,
    underscored: true
  });
  RdtItems.associate = function(models) {
    // RdtItems.hasMany(models.RdtUps,{
    //     as:'upvotes'
    // });
    // RdtItems.hasMany(models.RdtDowns,{
    //     as:'downvotes'
    // });
  };
  return RdtItems;
};
