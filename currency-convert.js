// convertCurrency(USD, CAD, 20) => '20 USD is worth 26 CAD. You can spend these in the followin g countries: Canada'
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.argv;

var from = argv._[0];
var to = argv._[1];
var amount = argv._[2];

const getExchangeRate = async (from, to) => {
  try {
    var res = await axios.get('http://data.fixer.io/api/latest?access_key=3e8779184277751663d1cc41b32546dc');
    var euro = 1/res.data.rates[from];
    var rate = euro * res.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  };
};

const getCountries = async (to) => {
  try {
    var res = await axios.get(`https://restcountries.eu/rest/v2/currency/${to}`);
    var countries = res.data.map((country) => country.name);
    return countries
  } catch (e) {
    throw new Error(`Unable to get countries where you can spend ${to}`);
  }
};

const convertCurrency = async (from, to, amount) => {
  var exchangeRate = await getExchangeRate(from, to);
  var value = (amount * exchangeRate).toFixed(2);
  var countries = await getCountries(to);
  var countries = countries.join(', ');
  return `${amount} ${from} is worth ${value} ${to}. \n\nYou can spend this in the following countries: \n\n${countries}`;
};

convertCurrency(from, to, amount).then((message) => {
  console.log(message);
}).catch((e) => {
  console.log(e);
});
