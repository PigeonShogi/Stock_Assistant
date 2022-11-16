const { By, until } = require('selenium-webdriver')
const variables = require('../config/variables')
const dbCRUD = require('./data-base-crud')

module.exports = {
  // 爬取各商品股價
  getPrices: async (driver, stockArray) => {
    try {
      for (const stock of stockArray) {
        await driver.get(`${variables.urlStockBase}${stock.code}`)
        let closingPrice = await driver.wait(until.elementLocated(By.xpath(variables.xPathClosingPrice))).getText()
        closingPrice = parseFloat(closingPrice)
        console.info('爬蟲已更新一筆資料')
        await dbCRUD.storePrice(closingPrice, stock.id)
        // 讓爬蟲稍微休息，避免對伺服器造成負擔。
        await driver.sleep(3000)
      }
    } catch (err) { console.error(err) }
  },
  // 爬取各商品近十年股利
  getDividendCashFlow: async (driver, stockArray) => {
    try {
      // 爬取陣列中每一檔股票的近十年股利
      for (const stock of stockArray) {
        let dividendSum = 0
        await driver.get(`${variables.urlStockDividend}${stock.code}`)
        await driver.wait(until.elementLocated(By.xpath('//*[@id="tblDetail"]/tbody/tr[14]/td[19]')), 3000)
        for (let i = 5; i <= 14; i++) {
          const dividend = await driver.findElement(By.xpath(`//*[@id="tblDetail"]/tbody/tr[${i}]/td[19]`)).getText()
          dividendSum += parseFloat(dividend)
        }
        await dbCRUD.storeDividendAvg(stock.id, (dividendSum / 10))
        // 讓爬蟲稍微休息，避免對伺服器造成負擔。
        await driver.sleep(3000)
        console.info('爬蟲已更新一筆記錄')
      }
    } catch (err) { console.error(err) }
  }
}
