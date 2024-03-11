const dbConfig = require("../db/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model");
db.role = require("./role.model");
db.tele1 = require("./tele1.model.js")(mongoose);
db.tele2 = require("./tele2.model.js")(mongoose);
db.states = require("./states.model.js")(mongoose);
db.lastvals = require("./lastvals.model.js")(mongoose);
db.rules = require("./rule.model.js")(mongoose);
db.lastwills = require("./lastwill.model.js")(mongoose);
db.stations = require("./station.model.js")(mongoose);
db.devices = require("./device.model.js")(mongoose);
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;