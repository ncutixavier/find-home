module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Jane Doe',
        email: 'janedoe@findhome.com',
        phone: '+250789874652',
        role: 'landlord',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jon Smith',
        email: 'jonsmith@findhome.com',
        phone: '+250789871234',
        role: 'client',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};