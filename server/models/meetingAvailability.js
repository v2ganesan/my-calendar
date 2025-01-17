const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const MeetingAvailability = sequelize.define('meeting_availability', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Refers to the User table
        key: 'id'
      }
    },
    day_of_week: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  
  module.exports = MeetingAvailability;
  