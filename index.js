const { Builder, By, until } = require('selenium-webdriver')
const variables = require('./config/variables')

async function browserAutomation () {
  const driver = await new Builder().forBrowser('chrome').build()
  await driver.get(`${variables.urlStockIdBase}${variables[50]}`)
  const closingPrice = await driver.wait(until.elementLocated(By.xpath(variables.xPathClosingPrice))).getText()
  console.log(closingPrice)
}

browserAutomation()
