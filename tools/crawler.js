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
        console.log(`${stock.id} 股價：${closingPrice}`)
        await dbCRUD.storePrice(closingPrice, stock.id)
        // 讓爬蟲稍微休息，避免對伺服器造成負擔。
        await driver.sleep(3000)
      }
    } catch (err) { console.error(err) }
  },
  // 爬取各商品近十年股利
  getDividendCashFlow: async (driver, stockArray) => {
    try {
      for (const stock of stockArray) {
        let dividendSum = 0
        for (let i = 5; i <= 14; i++) {
          await driver.get(`${variables.urlStockDividend}${stock.code}`)
          const dividend = await driver.wait(until.elementLocated(By.xpath(`//*[@id="tblDetail"]/tbody/tr[${i}]/td[19]`)), 3000).getText()
          console.log(dividend)
          dividendSum += parseFloat(dividend)
          console.log(dividendSum)
          if (i === 14) {
            await dbCRUD.storeDividendAvg(stock.code, (dividendSum / 10))
          }
          // 讓爬蟲稍微休息，避免對伺服器造成負擔。
          await driver.sleep(3000)
        }
        const info = `最近十年股利現金流：${dividendSum / 10}`
        console.info(info)
      }
    } catch (err) { console.error(err) }
  }
}
