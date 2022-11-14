const { Dividend, History, Stock } = require('../models')

module.exports = {
  // 從資料庫取出個股資訊，存入變數供爬蟲函式使用。
  getStocks: async function () {
    const stocks = await Stock.findAll({
      attributes: ['code', 'id'],
      raw: true
    })
    return stocks
  },
  // 將爬蟲取得的股價存入資料庫
  storePrice: async function (price, stockId) {
    await History.create({
      price,
      StockId: stockId
    })
  },
  // 將爬蟲取得的十年股利平均更新至資料庫
  storeDividendAvg: async function (codeString, tenYearAvg) {
    await Dividend.update(
      { tenYearAvg },
      { where: { code: codeString } })
  },
  // For GET /stocks 取出資料傳給前端。
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
