module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    houseId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'client'
    });
    Comment.belongsTo(models.House, {
      foreignKey: 'houseId',
      as: 'Houses'
    });
  };
  return Comment;
};