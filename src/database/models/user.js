module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    gender: DataTypes.STRING
  }, {});
  return User;
};