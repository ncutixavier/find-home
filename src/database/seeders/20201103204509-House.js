module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Houses',
    [
      {
        image: "https://live.staticflickr.com/148/337587776_cfd17e23e4_b.jpg",
        location: "Kigali, Nyarugenge",
        bedrooms: 3,
        bathrooms: 2,
        price: 55000,
        status: "available",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image: "https://live.staticflickr.com/7011/6539765469_eb1b42c647_b.jpg",
        location: "Kigali, Gasabo",
        bedrooms: 4,
        bathrooms: 2,
        price: 80000,
        status: "available",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Houses', null, {}),
};
