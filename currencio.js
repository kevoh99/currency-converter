const axios = require('axios')

// const getExchangeRate = async (fromCurrency, toCurrency) => {
const getExchangeRate = async (currencyData) => {
  try {
    const defaultCurrency = 'USD' // According to CurrencyLayer API documentation
    const sourceCurrency = `${defaultCurrency}${currencyData.fromCurrency}` // Example USDKES
    const resultingCurrency = `${defaultCurrency}${currencyData.toCurrency}` // Example USDHRK
    const response = await axios.get('http://www.apilayer.net/api/live?access_key=af908b96fc9d56f13d11929909a54b1c&format=1')
    const rate = response['data']['quotes'][sourceCurrency] // Example "USDKES":100.9445
    const dollarRate = 1 / rate // 1 / 100.9445 = 0.0099064
    const conversionCurrencyRate = response['data']['quotes'][resultingCurrency] // e.g. "USDHRK":6.594197
    const exchangeRate = dollarRate * conversionCurrencyRate // 0.0099064 * 6.594197
    return exchangeRate
  } catch (error) {
    throw new Error(`Unable to get currency data using ${currencyData.fromCurrency} and ${currencyData.toCurrency}. Please try again. If the problem persists, please contact us`)
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

// const convertCurrency = async (fromCurrency, toCurrency, amount) => {
const convertCurrency = async (currencyData) => {
  let data = {
    fromCurrency: currencyData.fromCurrency,
    toCurrency: currencyData.toCurrency
  }
  const exchangeRate = await getExchangeRate(data)

  const convertedAmount = (currencyData.amount * exchangeRate).toFixed(2)
  const countries = await getCountries(currencyData.toCurrency)
  return `${currencyData.amount} ${currencyData.fromCurrency} is worth ${convertedAmount} ${currencyData.toCurrency}. You can spend the cash in the following countries: ${countries}`
}

let currencyData = {
  fromCurrency: 'USD', // on real website, this would come from user input in the form
  toCurrency: 'GBP', // on real website, this would come from user input in the form
  amount: 10000 // on real website, this would come from user input in the form
}
convertCurrency(currencyData)
  .then((message) => {
    console.log(message)
  }).catch((error) => {
    console.log(error.message)
  })
