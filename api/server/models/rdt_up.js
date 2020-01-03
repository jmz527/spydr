'use strict';
module.exports = (sequelize, DataTypes) => {
  const RdtUps = sequelize.define('RdtUps', {
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
    tableName: 'RdtUps',
    timestamps: true,
    underscored: true
  });
  RdtUps.associate = function(models) {
    RdtUps.belongsTo(models.RdtUsers, {
      foreignKey: 'userRef',
      onDelete: 'CASCADE',
    });
    RdtUps.belongsTo(models.RdtItems, {
      foreignKey: 'rdtRef',
      onDelete: 'CASCADE',
    });
  };
  return RdtUps;
};
