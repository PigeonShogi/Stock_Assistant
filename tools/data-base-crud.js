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
      attributes: ['price'],
      include: [{
        model: Stock,
        attributes: ['name', 'code']
      }],
      nest: true,
      raw: true,
      limit: 10,
      order: [['created_at', 'DESC']]
    })
    return (prices)
  }
}
