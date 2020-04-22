const currencio = require('./currencio-express')
var answer

function nameless () {
  let div = document.getElementById('main-form')
  div.addEventListener('submit', function (currencyData) {
    let object
    object.fromCurrency = div.currencyAtHand.value
    object.toCurrency = div.currencyDesired.value
    object.amount = div.cashCount
    let computed = currencio.convertCurrency(object)
    answer = computed
    console.log(answer)
    window.alert(answer)
  })
}

nameless()
