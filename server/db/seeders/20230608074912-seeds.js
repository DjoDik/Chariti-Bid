const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
          username: 'Admin',
          email: 'admin@admin',
          phone: '88008000000',
          role: true,
          password,
          avatar:
            'https://thumbs.dreamstime.com/b/admin-icon-vector-male-user-person-profile-avatar-gear-cogwheel-settings-configuration-flat-color-glyph-pictogram-150138136.jpg',
          onlinestatus: false,
        },
        {
          username: 'Admin@',
          email: 'admin@admin2',
          phone: '8800',
          role: true,
          password,
          avatar:
            'https://thumbs.dreamstime.com/b/admin-icon-vector-male-user-person-profile-avatar-gear-cogwheel-settings-configuration-flat-color-glyph-pictogram-150138136.jpg',
          onlinestatus: false,
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Все',
          img: 'https://st3.depositphotos.com/2294011/14259/i/600/depositphotos_142591733-stock-photo-big-heap-of-different-clothes.jpg',
        },
        {
          name: 'Одежда',
          img: 'https://media.istockphoto.com/id/1257563298/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BC%D0%BE%D0%B4%D0%BD%D0%B0%D1%8F-%D0%BE%D0%B4%D0%B5%D0%B6%D0%B4%D0%B0-%D0%BD%D0%B0-%D1%81%D1%82%D0%BE%D0%B9%D0%BA%D0%B5-%D0%B2-%D1%81%D0%B2%D0%B5%D1%82%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-%D0%B2-%D0%BF%D0%BE%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D0%B8-%D0%BC%D0%B5%D1%81%D1%82%D0%BE-%D0%B4%D0%BB%D1%8F-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0.jpg?s=612x612&w=0&k=20&c=Wv_bo7wL9LMH6fzgdLZSeXhYT3JfUphJoaCOG3_P4rQ=',
        },
        {
          name: 'Мебель',
          img: 'https://cdn.inmyroom.ru/uploads/photo/file/d8/d8ab/d8ab600e-c040-48a9-bad7-9fc1c273cf43.jpg',
        },
        {
          name: 'Декор',
          img: 'https://dekorin.me/wp-content/uploads/2014/11/dekor-is-kartona.jpg',
        },
        {
          name: 'Электроника',
          img: 'https://flagma.de/upload/category/01/29/krupnaya-bytovaya-tehnika-38_9kLUp.jpg',
        },
        {
          name: 'Туризм',
          img: 'https://turizm.pibig.info/uploads/posts/2023-05/thumbs/1683617997_turizm-pibig-info-p-veshchi-dlya-turizma-turizm-instagram-24.jpg',
        },
        {
          name: 'Дача',
          img: 'https://design-homes.ru/images/galery/2286/mesta-khraneniya-na-dache_5f12e7add2ac6.jpg',
        },
        {
          name: 'Другое',
          img: 'https://img.vezetvsem.ru/files/393042/936/eee/903/936eee903d17f6cc9276dc17ad9caf52.jpeg',
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          category_id: 2,
          user_id: 1,
          price: 0,
          title: 'Ботинки',
          body: 'Крутые боты',
          city: 'Москва',
          lastUser_id: 2,
          sellStatus: true,
        },
        {
          category_id: 3,
          user_id: 1,
          price: 0,
          title: 'Стул',
          body: 'Крутой Стул',
          city: 'Томск',
          sellStatus: false,
        },
        {
          category_id: 4,
          user_id: 1,
          price: 0,
          title: 'Шторы',
          body: 'Крутые шторы',
          city: 'Санкт-Петербург',
          sellStatus: true,
        },
        {
          category_id: 5,
          user_id: 1,
          price: 0,
          title: 'Смартфон',
          body: 'Крутой смартфон',
          city: 'Ростов',
          sellStatus: false,
        },
        {
          category_id: 6,
          user_id: 1,
          price: 0,
          title: 'Спальник',
          body: 'Крутой спальник',
          city: 'Астрахань',
          sellStatus: true,
        },
        {
          category_id: 7,
          user_id: 1,
          price: 0,
          title: 'Мангал',
          body: 'Крутой мангал',
          city: 'Омск',
          sellStatus: false,
        },
        {
          category_id: 8,
          user_id: 1,
          price: 0,
          title: 'Другое',
          body: 'Крутое другое',
          city: 'Новосибирск',
          sellStatus: false,
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'FotoGaleries',
      [
        {
          item_id: 1,
          img: 'https://i.dummyjson.com/data/products/18/1.jpg',
        },
        {
          item_id: 2,
          img: 'https://i.dummyjson.com/data/products/18/2.jpg',
        },
        {
          item_id: 3,
          img: 'https://i.dummyjson.com/data/products/18/3.jpg,https://i.dummyjson.com/data/products/18/4.jpg',
        },
        {
          item_id: 4,
          img: 'https://i.dummyjson.com/data/products/18/thumbnail.jpg',
        },
        {
          item_id: 4,
          img: 'https://i.dummyjson.com/data/products/18/1.jpg',
        },
        {
          item_id: 3,
          img: 'https://i.dummyjson.com/data/products/18/2.jpg',
        },
        {
          item_id: 2,
          img: 'https://i.dummyjson.com/data/products/18/3.jpg,https://i.dummyjson.com/data/products/18/4.jpg',
        },
        {
          item_id: 1,
          img: 'https://i.dummyjson.com/data/products/18/thumbnail.jpg',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
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
  },
};
