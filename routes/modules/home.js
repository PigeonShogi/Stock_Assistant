const express = require('express')
const router = express.Router()
const dbCRUD = require('../../tools/data-base-crud')

router.get('/stocks', async (req, res) => {
  try {
    const stocks = await dbCRUD.showPrices()
    res.render('stocks', { stocks })
  } catch (err) { console.error(err) }
})

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
