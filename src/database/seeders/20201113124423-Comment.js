module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Comments",
      [
        {
          userId: 4,
          houseId: 1,
          comment:
            "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface) =>
    queryInterface.bulkDelete("Comments", null, {})
};