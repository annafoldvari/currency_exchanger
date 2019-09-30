const exchange = require('./currency.js');

const query = process.argv.slice(2);

console.log(query);

exchange.get(query);