module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: "Ncuti Xavier",
        email: "ncuti65@gmail.com",
        phone: "+250783573335",
        birthdate: "1997-10-26T00:00:00.000Z",
        role: "admin",
        gender: "male",
        password: "$2b$12$TLkbQTXkScTYUHdm0XFvX.QWHYFhnptRB2hmn0VrWJw8VLjcoweGS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin",
        email: "landlord@findhome.com",
        phone: "+250788888888",
        role: "landlord",
        birthdate: "1981-11-08T00:00:00.000Z",
        gender: "male",
        password: "$2b$12$YKJpWRee9N0EzOxVfzXqW.vdeALgWwNz.GulHqyCayjir.HHuLzX2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
