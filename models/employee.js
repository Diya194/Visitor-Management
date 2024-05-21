'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    
    static associate(models) {
      
    }
  }
  Employee.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    designation: DataTypes.STRING,
    is_allow: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees'
  });
  return Employee;
};