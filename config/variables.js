const variables = {
  // URL
  urlGoodInfo: 'https://goodinfo.tw/tw/index.asp',
  urlStockIdBase: 'https://goodinfo.tw/tw/StockDetail.asp?STOCK_ID=',
  // XPath
  xPathClosingPrice: '/html/body/table[2]/tbody/tr/td[3]/table/tbody/tr[1]/td/table/tbody/tr/td[1]/table/tbody/tr[3]/td[1]',
  // 股票代號。注意！上述 urlStockIdBase 加上 0056 與 加上 56 所得的結果並不相同。
  50: '0050', // 元大台灣50
  56: '0056', // 元大高股息
  2324: '2324' // 仁寶
}

module.exports = variables
