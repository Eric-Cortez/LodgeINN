'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    spotId: DataTypes.INTEGER,
    kitchen: DataTypes.BOOLEAN,
    privateBeachAccess: DataTypes.BOOLEAN,
    firePlace: DataTypes.BOOLEAN,
    parking: DataTypes.BOOLEAN,
    pool: DataTypes.BOOLEAN,
    hotTub: DataTypes.BOOLEAN,
    pets: DataTypes.BOOLEAN
  }, {});
  Amenity.associate = function(models) {
    // associations can be defined here
    Amenity.belongsTo(models.Spot, { foreignKey: 'spotId' });
  };
  return Amenity;
};