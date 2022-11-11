const { Builder } = require('selenium-webdriver')
const { disableGpu, headless, imageOff, shmUsage } = require('./config/chrome-options')
const crawler = require('./tools/crawler')
const dbCRUD = require('./tools/data-base-crud')

async function browserAutomation () {
  console.log('爬蟲開始任務')
  try {
    const stocks = await dbCRUD.getStocks()
    // 以無頭模式等設定啟動瀏覽器
    const driver = await new Builder().setChromeOptions(headless, imageOff, disableGpu, shmUsage).forBrowser('chrome').build()
    await crawler.getPrices(driver, stocks)
    console.log('爬蟲結束任務')
    await driver.quit()
  } catch (err) { console.error(err) }
}

browserAutomation()
