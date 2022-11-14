'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const stocks = await queryInterface.sequelize.query(
      'SELECT id FROM Stocks;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Dividends',
      Array.from(stocks, (value) => ({
        ten_year_avg: 0.00,
        stock_id: value.id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dividends', {})
  }
}
