'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    zipCode: DataTypes.INTEGER,
    guests: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.belongsTo(models.User, { foreignKey: 'userId' });
    Spot.hasMany(models.Review, { foreignKey: 'spotId' });
    Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
    Spot.hasMany(models.Amenity, { foreignKey: 'spotId' });
    Spot.hasMany(models.Image, { foreignKey: 'spotId' });
  };
  return Spot;
};