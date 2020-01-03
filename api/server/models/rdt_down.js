'use strict';
module.exports = (sequelize, DataTypes) => {
  const RdtDowns = sequelize.define('RdtDowns', {
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
    userRef: {
      field: 'user_ref',
      type: DataTypes.UUID,
      allowNull: false,
    },
    rdtRef: {
      field: 'rdt_ref',
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    tableName: 'RdtDowns',
    timestamps: true,
    underscored: true
  });
  RdtDowns.associate = function(models) {
    RdtDowns.belongsTo(models.RdtUsers, {
      foreignKey: 'userRef',
      onDelete: 'CASCADE',
    });
    RdtDowns.belongsTo(models.RdtItems, {
      foreignKey: 'rdtRef',
      onDelete: 'CASCADE',
    });
  };
  return RdtDowns;
};
