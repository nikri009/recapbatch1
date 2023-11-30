'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init({
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    author: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    technologies: DataTypes.ARRAY(DataTypes.STRING),
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};