'use strict';
module.exports = (sequelize, DataTypes) => {
  const IgrmUsers = sequelize.define('IgrmUsers', {
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
    name: {
      field: 'name',
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      field: 'is_active',
      allowNull: false,
      default: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    freezeTableName: true,
    tableName: 'IgrmUsers',
    timestamps: true,
    underscored: true
  });
  IgrmUsers.associate = function(models) {
    // IgrmUsers.hasMany(models.IgrmItems,{
    //     as:'items'
    // });
  };
  return IgrmUsers;
};
