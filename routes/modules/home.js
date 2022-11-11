const express = require('express')
const router = express.Router()
const dbCRUD = require('../../tools/data-base-crud')

router.get('/stocks', async (req, res) => {
  try {
    const prices = await dbCRUD.showPrices()
    res.render('stocks', { prices })
  } catch (err) { console.error(err) }
})

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
