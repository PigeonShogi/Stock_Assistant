'use strict'

module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {}, {})
  Stock.associate = function (models) {
    Stock.hasMany(models.History, { foreignKey: 'StockId' })
  }
  Stock.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stock',
    tableName: 'Stocks',
    underscored: true
  })
  return Stock
}
