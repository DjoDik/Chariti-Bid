const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Item }) {
      this.hasMany(Item, { foreignKey: 'category_id' });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      img: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );
  return Category;
};
