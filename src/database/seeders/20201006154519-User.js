module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Admin',
        email: 'admin@findhome.com',
        phone: '+250788888888',
        role: 'admin',
        gender: 'male',
        birthdate: '1981-11-08',
        password: 'pass1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
