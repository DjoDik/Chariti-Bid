const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Basket, Item,Chat }) {
      this.hasMany(Basket, { foreignKey: 'user_id' });
      this.hasMany(Item, { foreignKey: 'user_id' });
      this.hasMany(Chat, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.BOOLEAN,
      phone: DataTypes.STRING,
      avatar: DataTypes.STRING,
      onlinestatus: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
