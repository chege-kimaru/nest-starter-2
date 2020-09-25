'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmailVerificationToken = sequelize.define('EmailVerificationToken', {
    token: DataTypes.STRING
  }, {});
  EmailVerificationToken.associate = function(models) {
    // associations can be defined here
  };
  return EmailVerificationToken;
};