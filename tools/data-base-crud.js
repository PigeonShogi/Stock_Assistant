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
  },
  showPrices: async function () {
    const prices = await History.findAll({
      limit: 10,
      attributes: ['price'],
      include: [{
        model: Stock,
        attributes: ['name', 'code']
      }],
      nest: true,
      raw: true,
      group: ''
    })
    return (prices)
  }
}
