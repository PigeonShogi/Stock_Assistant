require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')

function lineNotify () {
  const token = `Bearer ${process.env.LINE_TOKEN}`
  const formData = new FormData()
  formData.append('message', '股價更新完畢。來看看最近哪一檔存股標的比較划算吧！')
  formData.append('stickerPackageId', '6362')
  formData.append('stickerId', '11087925')
  const headers = Object.assign({
    Authorization: token
  }, formData.getHeaders())

  axios({
    url: 'https://notify-api.line.me/api/notify',
    method: 'post',
    data: formData,
    headers
  })
    .then(res => console.info('LINE Notify 已通知用戶檢視股價', res.data))
    .catch(err => {
      console.error('LINE Notify 通知用戶失敗')
      if (err.response) {
        console.error(`HTTP 狀態碼：${err.response.status}`)
        console.error(err.response.data)
      } else {
        console.error(err)
      }
    })
}

module.exports = lineNotify
