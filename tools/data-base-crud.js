const { History, Stock } = require('../models')

module.exports = {
  getStocks: async function () {
    const stocks = await Stock.findAll({
      attributes: ['code', 'id'],
      raw: true
    })
    return stocks
  },
  storePrice: async function (price, stockId) {
    await History.create({
      price,
      StockId: stockId
    })
  }
}
