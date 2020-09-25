'use strict';
module.exports = (sequelize, DataTypes) => {
  const ForgotPasswordToken = sequelize.define('ForgotPasswordToken', {
    token: DataTypes.STRING
  }, {});
  ForgotPasswordToken.associate = function(models) {
    // associations can be defined here
  };
  return ForgotPasswordToken;
};