if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const exphbs = require('express-handlebars')

const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3456

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use(routes)

app.listen(port, () => {
  console.info(`Stock Crawler app.js is running on http://localhost:${port}`)
})
