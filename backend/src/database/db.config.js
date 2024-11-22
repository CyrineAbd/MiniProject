const config = require('../config/config');
const mongoose = require('mongoose');

const db = {};
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

db.mongoose = mongoose;
db.url = config.DB_URL;

db.sejours = require('../api/models/sejour.model')(mongoose);
db.agences = require('../api/models/agence.model')(mongoose);

module.exports = db ;