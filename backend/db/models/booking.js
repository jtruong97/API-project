'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    startDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        checkDate(date){
          if(date < new Date()){ //start date cannot be before todays date
            throw new Error("startDate cannot be in the past")
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        checkDate(date){
          if(this.startDate > date){ //the end date cannot be before the start date
            throw new Error("endDate cannot be on or before startDate")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
