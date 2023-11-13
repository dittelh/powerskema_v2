const Sequelize = require("sequelize");
const sequelize = new Sequelize('powerskema_v2_private', 'root', 'root', {
  host: "localhost",
  dialect: "mysql",
  port: 3306
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.events = require("./event.model.js")(sequelize, Sequelize);

module.exports = db;