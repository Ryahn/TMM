const 
    config = require('../config/database'),
    Sequelize = require('sequelize'),
    sequelize = new Sequelize(config),
    db = {}
    ;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./models/users')(sequelize, Sequelize);

module.exports = db;