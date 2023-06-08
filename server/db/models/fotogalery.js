'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FotoGalery extends Model {
    static associate({Item}) {
      this.belongsTo(Item, { foreignKey: 'item_id' });
    }
  }
  FotoGalery.init({
    img: DataTypes.TEXT,
    item_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FotoGalery',
  });
  return FotoGalery;
};