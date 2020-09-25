'use strict';
module.exports = (sequelize, DataTypes) => {
  const RavePayment = sequelize.define('RavePayment', {
    txId: DataTypes.STRING,
    txRef: DataTypes.STRING,
    flwRef: DataTypes.STRING,
    orderRef: DataTypes.STRING,
    raveRef: DataTypes.STRING,
    accountId: DataTypes.STRING,
    accountName: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    paymentType: DataTypes.STRING,
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    created: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  RavePayment.associate = function(models) {
    // associations can be defined here
  };
  return RavePayment;
};