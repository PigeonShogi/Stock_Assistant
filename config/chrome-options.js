const chrome = require('selenium-webdriver/chrome')
const options = new chrome.Options()

// 不載入圖片
const imageOff = options.addArguments('blink-settings=imagesEnabled=false')
// 不開啟瀏覽器視窗（無頭模式）
const headless = options.addArguments('--headless')
// 規避 bug
const disableGpu = options.addArguments('--disable-gpu')
// 暫存區使用 /tmp 而非 /dev/shm
const shmUsage = options.addArguments('--disable-dev-shm-usage')

module.exports = {
  disableGpu,
  headless,
  imageOff,
  shmUsage
}
