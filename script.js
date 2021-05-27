const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

const calculate = (changed = 1) => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  fetch("https://open.exchangerate-api.com/v6/latest")
    .then(res => res.json())
    .then(data => {
      //  console.log(data);
      const rate = data.rates[currency_two] / data.rates[currency_one];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      if (changed === 1) {
        amountEl_two.value = (amountEl_one.value * (rate)).toFixed(2);
      } else if (changed === 2) {
        amountEl_one.value = (amountEl_two.value / (rate)).toFixed(2);
      }
    });
}

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

// Event Listeners
currencyEl_one.addEventListener('change', () => calculate(1));
currencyEl_two.addEventListener('change', () => calculate(2));

amountEl_one.addEventListener('input', () => {
  if (+amountEl_one.value < 0) amountEl_one.value = -amountEl_one.value;

  calculate(1);
});
amountEl_two.addEventListener('input', () => {
  if (+amountEl_two.value < 0) amountEl_two.value = -amountEl_one.value;

  calculate(2);
});

calculate();
