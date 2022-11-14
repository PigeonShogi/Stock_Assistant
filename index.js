require('dotenv').config()
const { Builder } = require('selenium-webdriver')
const { disableGpu, headless, imageOff, shmUsage } = require('./config/chrome-options')
const crawler = require('./tools/crawler')
const dbCRUD = require('./tools/data-base-crud')
const lineNotify = require('./tools/line-notify')

async function browserAutomation (callback, messageString) {
  console.info(`爬蟲開始任務 ${new Date()}`)
  try {
    const stocks = await dbCRUD.getStocks()
    // 以無頭模式等設定啟動瀏覽器
    const driver = await new Builder().setChromeOptions(headless, imageOff, disableGpu, shmUsage).forBrowser('chrome').build()
    await callback(driver, stocks)
    console.info(`爬蟲結束任務${new Date()}`)
    lineNotify(messageString)
    await driver.quit()
  } catch (err) { console.error(err) }
}

browserAutomation(crawler.getDividendCashFlow, '測試中')

module.exports = browserAutomation
