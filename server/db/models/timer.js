'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timer extends Model {
    static associate({Item}) {
      this.belongsTo(Item, { foreignKey: 'item_id' });
    }
  }
  Timer.init({
    item_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Timer',
  });
  return Timer;
};