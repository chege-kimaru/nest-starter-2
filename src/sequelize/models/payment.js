'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    currency: DataTypes.STRING,
    amount: DataTypes.DECIMAL
  }, {});
  Payment.associate = function(models) {
    // associations can be defined here
  };
  return Payment;
};