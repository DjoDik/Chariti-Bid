'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({ Item }) {
      this.belongsTo(Item, { foreignKey: 'item_id' });
    }
  }
  Chat.init({
    massage: DataTypes.TEXT,
    byer_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};