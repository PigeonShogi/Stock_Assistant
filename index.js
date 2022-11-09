const { Builder, By, until } = require('selenium-webdriver')
const variables = require('./config/variables')
const { disableGpu, headless, imageOff, shmUsage } = require('./config/chrome-options')

async function browserAutomation (stockArray) {
  console.log('爬蟲開始任務')
  // 以無頭模式等設定啟動瀏覽器
  const driver = await new Builder().setChromeOptions(headless, imageOff, disableGpu, shmUsage).forBrowser('chrome').build()
  for (const stock of stockArray) {
    await driver.get(`${variables.urlStockIdBase}${variables[stock]}`)
    const closingPrice = await driver.wait(until.elementLocated(By.xpath(variables.xPathClosingPrice))).getText()
    console.log(closingPrice)
    // 讓爬蟲稍微休息，避免對伺服器造成負擔。
    await driver.sleep(3000)
  }
  console.log('爬蟲結束任務')
  await driver.quit()
}

browserAutomation([50, 56, 2324])
