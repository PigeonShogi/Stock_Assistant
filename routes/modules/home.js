const express = require('express')
const router = express.Router()
const dbCRUD = require('../../tools/data-base-crud')

router.get('/', async (req, res) => {
  try {
    const stocks = await dbCRUD.showPrices()
    res.render('index', { stocks })
  } catch (err) { console.error(err) }
})

module.exports = router
