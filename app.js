// external
const express = require("express");
const bodyParser = require('body-parser');

const config = require('./config');

// controllers
const DummyTokensController = require('./controllers/dummy-tokens');

const app = express();

// middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes
// Get a dummy token's balance for a given address.
app.get('/dummy-tokens/:tokenAddress/balance/:address', DummyTokensController.getTokenBalance);
// Set a dummy token's balance.
app.post('/dummy-tokens/:tokenAddress/balance/:address', DummyTokensController.setTokenBalance);

app.listen(config.port, () => console.log('Running on http://localhost:' + config.port));