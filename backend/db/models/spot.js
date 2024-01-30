'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User,{
        foreignKey: 'ownerId'
      });

      Spot.hasMany(models.Review,{
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      });

      Spot.hasMany(models.Booking,{
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })

      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1,100]
      }
    },
    city:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1,50]
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate:{
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING(50),
      validate: {
        len: [1,50],
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.DECIMAL(7,2),
      validate:{
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
