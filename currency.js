const http = require('http');
const https = require('https');

//Print out the exchange details

function printExchange(exchange, query) {
    let rate = exchange["rates"][query[2]];
    let result = rate * parseInt(query[0], 10);
    const message = `${query[0]} ${query[1]} is ${result.toFixed(2)} ${query[2]}`;
    console.log(message);
}

//Print out error message
function printError(error) {
    console.log(error.message);
}

//Get the rates

function get(query) {
  try {  
   const url = `https://api.exchangeratesapi.io/latest?base=${query[1]}&symbols=${query[2]}`;

   const request = https.get(url, response => {
      if(response.statusCode === 200) { 
            let body = '';
            //Read the data
            response.on('data', chunk => {
                body += chunk;
             });
            response.on('end', () => {
                try {  
                    //Parse the data
                    const exchange = JSON.parse(body);
                    //Print the data
                    printExchange(exchange, query);
                } catch (error) {
                    //Parser error
                    printError(error);
                }
            });
        } else {
            // Status error code
            const statusErrorCode = new Error(`There was an error with the details you gave. (${http.STATUS_CODES[response.statusCode]})`);
            printError(statusErrorCode);
        }

   });

  } catch (error) {
    printError(error);
    }   


}

module.exports.get = get;