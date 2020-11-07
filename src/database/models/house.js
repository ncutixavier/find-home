module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define('House', {
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  House.associate = function(models) {
    House.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'landlord',
      onDelete: 'CASCADE',
    })
  };
  return House;
};