module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Houses',
    [
      {
        image: "house_12.jpg",
        description: "Some description...",
        location: "Kigali",
        bedrooms: 3,
        bathrooms: 3,
        price: 100,
        status: "available",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image: "house_35.jpg",
        description: "Some description...",
        location: "Karongi",
        bedrooms: 1,
        bathrooms: 1,
        price: 1000,
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
