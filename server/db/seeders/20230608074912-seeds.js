'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const password = await bcrypt.hash('123', 5);
    
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            username: "Admin",
            email: "admin@admin",
            phone:'88008000000',
            role: true,
            password,
            avatar:"https://thumbs.dreamstime.com/b/admin-icon-vector-male-user-person-profile-avatar-gear-cogwheel-settings-configuration-flat-color-glyph-pictogram-150138136.jpg",
            onlinestatus:false
          },
          {
            username: "Admin@",
            email: "admin@admin2",
            phone:'8800',
            role: true,
            password,
            avatar:"https://thumbs.dreamstime.com/b/admin-icon-vector-male-user-person-profile-avatar-gear-cogwheel-settings-configuration-flat-color-glyph-pictogram-150138136.jpg",
            onlinestatus:false
          },
        ],
        {},
      );
      await queryInterface.bulkInsert(
        'Categories',
        [
          {
            name: "Все",
          },
          {
            name: "Одежда",
          },
          {
            name: "Мебель",
          },
          {
            name: "Декор",
          },
          {
            name: "Электроника",
          },
          {
            name: "Туризм",
          },
          {
            name: "Для дачи",
          },
          {
            name: "Другое",
          },
        ],
        {},
      );
      await queryInterface.bulkInsert(
        'Items',
        [
          {
            category_id:2,
            user_id: 1,
            price:0,
            title:"Ботинки",
            body:"Крутые боты",
            city:'Москва',
            lastUser_id:2,
            sellStatus:true,
          },
          {
            category_id:3,
            user_id: 1,
            price:0,
            title:"Стул",
            body:"Крутой Стул",
            city:'Томск',
            sellStatus:false,
          },
          {
            category_id:4,
            user_id: 1,
            price:0,
            title:"Шторы",
            body:"Крутые шторы",
            city:'Санкт-Петербург',
            sellStatus:true,
          },
          {
            category_id:5,
            user_id: 1,
            price:0,
            title:"Смартфон",
            body:"Крутой смартфон",
            city:'Ростов',
            sellStatus:false,
          },
          {
            category_id:6,
            user_id: 1,
            price:0,
            title:"Спальник",
            body:"Крутой спальник",
            city:'Астрахань',
            sellStatus:true,
          },
          {
            category_id:7,
            user_id: 1,
            price:0,
            title:"Мангал",
            body:"Крутой мангал",
            city:'Омск',
            sellStatus:false,
          },
          {
            category_id:8,
            user_id: 1,
            price:0,
            title:"Другое",
            body:"Крутое другое",
            city:'Новосибирск',
            sellStatus:false,
          },
        ],
        {},
      );
      await queryInterface.bulkInsert(
        'FotoGaleries',
        [
          {
           item_id:1,
           img:"https://i.dummyjson.com/data/products/18/1.jpg"
          },
          {
            item_id:2,
            img:"https://i.dummyjson.com/data/products/18/2.jpg"
           },
           {
            item_id:3,
            img:"https://i.dummyjson.com/data/products/18/3.jpg,https://i.dummyjson.com/data/products/18/4.jpg"
           },
           {
            item_id:4,
            img:"https://i.dummyjson.com/data/products/18/thumbnail.jpg"
           },
           {
            item_id:4,
            img:"https://i.dummyjson.com/data/products/18/1.jpg"
           },
           {
             item_id:3,
             img:"https://i.dummyjson.com/data/products/18/2.jpg"
            },
            {
             item_id:2,
             img:"https://i.dummyjson.com/data/products/18/3.jpg,https://i.dummyjson.com/data/products/18/4.jpg"
            },
            {
             item_id:1,
             img:"https://i.dummyjson.com/data/products/18/thumbnail.jpg"
            },
        ],
        {},
      );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Items', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('FotoGaleries', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
