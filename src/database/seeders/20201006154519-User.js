module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: "Ncuti Xavier",
        email: "ncuti65@gmail.com",
        phone: "+250783573335",
        birthdate: "1997-10-26T00:00:00.000Z",
        role: "landlord",
        gender: "male",
        password: "$2b$12$O/KCOk8EfNuZ8CVUDRbn3uS7w31cvuiZdrvOZq2jSs09nHm0r1WcK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shumbusho Simon",
        email: "simon45@gmail.com",
        phone: "+250783573335",
        birthdate: "1997-10-26T00:00:00.000Z",
        role: "landlord",
        gender: "male",
        password: "$2b$12$O/KCOk8EfNuZ8CVUDRbn3uS7w31cvuiZdrvOZq2jSs09nHm0r1WcK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin",
        email: "admin@findhome.com",
        phone: "+250788888888",
        birthdate: "1981-11-08T00:00:00.000Z",
        role: "admin",
        gender: "male",
        password: "$2b$12$xa77ulvMDgbQhQoLkasA1.fK2QQt1CZuV1qNnNWNxLzQ.kWhtp5nq",
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        name: "Client",
        email: "client@findhome.com",
        phone: "+250788888888",
        birthdate: "1981-11-08T00:00:00.000Z",
        role: "client",
        gender: "male",
        password: "$2b$12$xa77ulvMDgbQhQoLkasA1.fK2QQt1CZuV1qNnNWNxLzQ.kWhtp5nq",
        updatedAt: new Date(),
        createdAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
