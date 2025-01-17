const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Event = sequelize.define('events', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: 'Event',
      allowNull: false
    },
    duration: {
      type: DataTypes.TIME,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  
  module.exports = Event;
  