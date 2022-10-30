const { Builder, By, until } = require('selenium-webdriver')
const variables = require('./config/variables')

async function browserAutomation (stockArray) {
  const driver = await new Builder().forBrowser('chrome').build()
  for (const stock of stockArray) {
    await driver.get(`${variables.urlStockIdBase}${variables[stock]}`)
    const closingPrice = await driver.wait(until.elementLocated(By.xpath(variables.xPathClosingPrice))).getText()
    console.log(closingPrice)
  }
}

browserAutomation([50, 56, 2324])
