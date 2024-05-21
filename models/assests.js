'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Assests.init({
    name: DataTypes.STRING,
    department: DataTypes.STRING,
    status: DataTypes.STRING,
    remark: DataTypes.STRING,
    aId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Assests',
    tableName: 'assests'
  });
  return Assests;
};