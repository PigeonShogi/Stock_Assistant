require('dotenv').config()
const { scheduleJob } = require('node-schedule')
const browserAutomation = require('../index')
let isCrawlerRun = false // 用以檢查爬蟲是否執行中

scheduleJob(process.env.SCHEDULE_TIME, async () => {
  console.info('排程套件啟用中')
  try {
    if (!isCrawlerRun) { // 程式運作期間僅執行一隻爬蟲
      isCrawlerRun = true
      console.info(`排程作業啟動爬蟲 ${new Date()}`)
      await browserAutomation()
      isCrawlerRun = false
      console.info('排程作業執行完畢')
    }
  } catch (err) { console.error(err) }
})
