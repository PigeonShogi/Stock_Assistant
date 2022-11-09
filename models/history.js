'use strict'

module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {}, {})
  History.associate = function (models) {
    // History.belongsTO(models.Stock, { foreignKey: 'StockId' })
  }
  History.init({
    price: DataTypes.DECIMAL(6, 2),
    StockId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
    tableName: 'Histories',
    underscored: true
  })
  return History
}
