import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('pawtrack', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // IMPORTANT: must be 'mysql'
  logging: false,   // optional, for cleaner logs
});

try {
  await sequelize.authenticate();
  console.log('Database connected');
} catch (err) {
  console.error('Database connection failed:', err);
}

export default sequelize;
