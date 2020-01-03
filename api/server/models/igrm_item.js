'use strict';
module.exports = (sequelize, DataTypes) => {
  const IgrmItems = sequelize.define('IgrmItems', {
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
    picId: {
      field: 'pic_id',
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    code: {
      field: 'code',
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    lowResImg: {
      field: 'low_res_img',
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbImg: {
      field: 'thumb_img',
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      field: 'link',
      type: DataTypes.STRING,
      allowNull: false,
    },
    loc: {
      field: 'loc',
      type: DataTypes.STRING,
      allowNull: false,
    },
    cap: {
      field: 'cap',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userRef: {
      field: 'user_ref',
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
    tableName: 'IgrmItems',
    timestamps: true,
    underscored: true
  });
  IgrmItems.associate = function(models) {
    IgrmItems.belongsTo(models.IgrmUsers, {
      foreignKey: 'userRef',
      onDelete: 'CASCADE',
    });
  };
  return IgrmItems;
};
