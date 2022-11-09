const { By, until } = require('selenium-webdriver')
const variables = require('../config/variables')

module.exports = {
  getPrices: async (driver, stockArray) => {
    for (const stock of stockArray) {
      await driver.get(`${variables.urlStockIdBase}${variables[stock]}`)
      const closingPrice = await driver.wait(until.elementLocated(By.xpath(variables.xPathClosingPrice))).getText()
      console.log(closingPrice)
      // 讓爬蟲稍微休息，避免對伺服器造成負擔。
      await driver.sleep(3000)
    }
  }
}
