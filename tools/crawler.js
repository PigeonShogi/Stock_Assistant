const { By, until } = require('selenium-webdriver')
const variables = require('../config/variables')
const dbCRUD = require('./data-base-crud')

module.exports = {
  getPrices: async (driver, stockArray) => {
    for (const stock of stockArray) {
      await driver.get(`${variables.urlStockIdBase}${stock.code}`)
      let closingPrice = await driver.wait(until.elementLocated(By.xpath(variables.xPathClosingPrice))).getText()
      closingPrice = parseFloat(closingPrice)
      console.log(`${stock.id} 股價：${closingPrice}`)
      await dbCRUD.storePrice(closingPrice, stock.id)
      // 讓爬蟲稍微休息，避免對伺服器造成負擔。
      await driver.sleep(3000)
    }
  }
}
