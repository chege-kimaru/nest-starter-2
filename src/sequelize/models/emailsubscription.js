'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmailSubscription = sequelize.define('EmailSubscription', {
    email: DataTypes.STRING
  }, {});
  EmailSubscription.associate = function(models) {
    // associations can be defined here
  };
  return EmailSubscription;
};