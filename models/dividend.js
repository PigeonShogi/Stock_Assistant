'use strict'
module.exports = (sequelize, DataTypes) => {
  const Dividend = sequelize.define('Dividend', {}, {})
  Dividend.associate = function (models) {
    Dividend.belongsTo(models.Stock, { foreignKey: 'StockId' })
  }
  Dividend.init({
    tenYearAvg: DataTypes.DECIMAL(8, 4),
    StockId: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'Dividend',
    tableName: 'Dividends',
    underscored: true
  })
  return Dividend
}
