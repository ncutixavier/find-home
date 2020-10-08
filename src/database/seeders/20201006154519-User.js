module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        phone: '+250788888888',
        role: 'landlord',
        gender: 'Female',
        birthdate: '1981-11-08',
        password: '@#EW23ER@#arsrREffTR5d5ddsdg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
