'use strict'

const stock = require('./stock.json')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stocks',
      Array.from(stock, (value) => ({
        code: value.code,
        name: value.name,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stocks', {})
  }
}
