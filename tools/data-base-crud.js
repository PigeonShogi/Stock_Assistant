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
  // 將爬蟲取得的股價更新至資料庫
  storePrice: async function (price, stockId) {
    await History.update(
      { price },
      { where: { StockId: stockId } }
    )
  },
  // 將爬蟲取得的十年股利平均更新至資料庫
  storeDividendAvg: async function (stockId, tenYearAvg) {
    await Dividend.update(
      { tenYearAvg },
      { where: { StockId: stockId } }
    )
  },
  // For GET /stocks 取出資料傳給前端。
  showPrices: async function () {
    const stocks = await Stock.findAll({
      attributes: ['name', 'code'],
      include: [{
        model: History,
        attributes: ['price']
      },
      {
        model: Dividend,
        attributes: ['tenYearAvg']
      }
      ],
      nest: true,
      raw: true,
      order: [['code', 'ASC']]
    })
    stocks.forEach(stock => {
      stock.stockValue20Y = stock.Dividends.tenYearAvg * 20
      stock.priceValue = ((stock.Histories.price / stock.stockValue20Y) * 100).toFixed(4)
    })
    console.log(stocks)
    return (stocks)
  }
}
