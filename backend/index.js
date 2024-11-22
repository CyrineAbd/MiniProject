const express = require('express');
const cors = require('cors');
const database = require('./src/database/db.config');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database.mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send({ message: 'Hello, World!' });
});

// Routes
require('./src/api/routes/routes')(app);

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});