'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: DataTypes.UUID,
    roleId: DataTypes.UUID
  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};