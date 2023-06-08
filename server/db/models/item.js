'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    
    static associate({User, Category, Timer, FotoGalery, Basket, Chat}) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Category, { foreignKey: 'category_id' });
      this.hasMany(Timer, { foreignKey: 'item_id' });
      this.hasMany(FotoGalery, { foreignKey: 'item_id' });
      this.hasMany(Basket, { foreignKey: 'item_id' });
      this.hasMany(Chat, { foreignKey: 'item_id' });
    }
  }
  Item.init({
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    uuid: DataTypes.STRING,
    city: DataTypes.STRING,
    sellStatus: DataTypes.BOOLEAN,
    lastUser_id: DataTypes.INTEGER,
    img: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};