'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Histories',
      'stock_id',
      {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    )
  },
  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Histories', 'stock_id')
  }
}
