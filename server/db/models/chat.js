'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({ Item,User }) {
      this.belongsTo(Item, { foreignKey: 'item_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Chat.init({
    body: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};