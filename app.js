/* Next, try passing in objects as function arguments as opposed to multiple variables. Useful URL: https://stackoverflow.com/questions/7764536/pass-object-to-javascript-function */

const axios = require('axios')

const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const defaultCurrency = 'USD' // According to Apilayer API documentation
    const sourceCurrency = `${defaultCurrency}${fromCurrency}` // Example USDKES
    const resultingCurrency = `${defaultCurrency}${toCurrency}` // Example USDHRK
    const response = await axios.get('http://www.apilayer.net/api/live?access_key=af908b96fc9d56f13d11929909a54b1c&format=1')
    const rate = response['data']['quotes'][sourceCurrency] // Example "USDKES":100.9445
    const dollarRate = 1 / rate // 1 / 100.9445 = 0.0099064
    const conversionCurrencyRate = response['data']['quotes'][resultingCurrency] // e.g. "USDHRK":6.594197
    const exchangeRate = dollarRate * conversionCurrencyRate // 0.0099064 * 6.594197
    return exchangeRate
  } catch (error) {
    throw new Error(`Unable to get currency data using ${fromCurrency} and ${toCurrency}. Please try again. If the problem persists, please contact us`)
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    // return response.data.map((country) => country.name)
    const countries = response.data.map((country) => {
      return country.name
    })
    return countries
  } catch (error) {
    throw new Error(`Our system was unable to find countries that use ${currencyCode}. Sorry`)
  }
}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency)
  const convertedAmount = (amount * exchangeRate).toFixed(2)
  const countries = await getCountries(toCurrency)
  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend the cash in the following countries: ${countries}`
}

convertCurrency('KES', 'USD', 100000)
  .then((message) => {
    console.log(message)
  }).catch((error) => {
    console.log(error.message)
  })
