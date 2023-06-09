'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate({User, Item}) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Item, { foreignKey: 'item_id' });
    }
  }
  Basket.init({
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Basket',
  });
  return Basket;
};