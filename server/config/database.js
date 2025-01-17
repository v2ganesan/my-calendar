require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  schema: 'public',
  logging: true,
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection established successfully.');
    // Test query to verify table access
    return sequelize.query('SELECT * FROM "public"."users" LIMIT 1');
  })
  .then(result => {
    console.log('Successfully queried users table:', result);
  })
  .catch(err => {
    console.error('Unable to connect to the database or query table:', err);
  });

module.exports = sequelize; 