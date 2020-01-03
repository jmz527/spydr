'use strict';
module.exports = (sequelize, DataTypes) => {
  const RdtUsers = sequelize.define('RdtUsers', {
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
    user: {
      field: 'user',
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
    tableName: 'RdtUsers',
    timestamps: true,
    underscored: true
  });
  RdtUsers.associate = function(models) {
    // RdtUsers.hasMany(models.RdtUps,{
    //     as:'upvotes'
    // });
    // RdtUsers.hasMany(models.RdtDowns,{
    //     as:'downvotes'
    // });
  };
  return RdtUsers;
};
