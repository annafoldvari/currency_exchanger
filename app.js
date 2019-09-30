const exchange = require('./currency.js');

const query = process.argv.slice(2);

exchange.get(query);