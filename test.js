/* document.getElementById('main-body').onload = function () {
  document.getElementById('main-form').onsubmit = function () {
    let temp1 = document.getElementById('currency-at-hand')
    console.log(temp1)
    let temp2 = document.getElementById('currency-desired')
    console.log(temp2)
  }
}

let currencyData = {
  fromCurrency: temp1, // on real website, this would come from user input in the form
  toCurrency: temp2, // on real website, this would come from user input in the form
  amount: 10000 // on real website, this would come from user input in the form
}
convertCurrency(currencyData)
  .then((message) => {
    console.log(message)
    document.getElementById('results').innerHTML = message
  }).catch((error) => {
    console.log(error.message)
  })

var parag = document.getElementById('results')
parag.innerHTML = message
parag.style.fontWeight = 'bold'
 */
