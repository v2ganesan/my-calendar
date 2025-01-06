const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define('info', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: false
  },
  meeting_avail: {
    type: DataTypes.RANGE(DataTypes.DATE),
    allowNull: false
  },
  meeting_duration: {
    type: DataTypes.TIME,
    allowNull: false
  },
  meeting_location: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = User; 