const sequelize = require('../lib/db');                 
const User = require('../models/User');        
const Pet = require('../models/Pet');
const Record = require('../models/Records');
const Address = require('../models/Addresses');

(async () => {
  try {
    await sequelize.sync({ force: false }); // force: true → drops & recreates tables
    console.log('✅ All tables synced!');
  } catch (err) {
    console.error('❌ Error syncing tables:', err);
  } finally {
    await sequelize.close();
    console.log('🔒 Connection closed');
  }
})();
