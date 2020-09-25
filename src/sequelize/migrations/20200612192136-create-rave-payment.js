'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RavePayments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      paymentId: {
        type: Sequelize.UUID,
        allowNull: true,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        references: {
          model: 'Payments',
          key: 'id',
        },
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'KES',
      },
      amount: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
      },
      txId: {
        type: Sequelize.STRING,
      },
      txRef: {
        type: Sequelize.STRING,
      },
      flwRef: {
        type: Sequelize.STRING,
      },
      orderRef: {
        type: Sequelize.STRING,
      },
      raveRef: {
        type: Sequelize.STRING,
      },
      accountId: {
        type: Sequelize.STRING,
      },
      accountName: {
        type: Sequelize.STRING,
      },
      ravePaymentId: {
        type: Sequelize.STRING,
      },
      paymentType: {
        type: Sequelize.STRING,
      },
      customerName: {
        type: Sequelize.STRING,
      },
      customerEmail: {
        type: Sequelize.STRING,
      },
      customerPhone: {
        type: Sequelize.STRING,
      },
      created: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      cardType: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RavePayments');
  },
};
