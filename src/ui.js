const $dropdownMenu = document.querySelector(".dropdown-menu");
const $dateInput = document.querySelector("input");
const $form = document.querySelector("form");

function dropdownOptionCreator(currency) {
    let link = document.createElement('a');
    link.classList.add("dropdown-item");
    link.setAttribute('href', '#');
    link.innerText = currency;
    return link;
}

function tableElementCreator(rate, exchange, countryCode) {
    let row = document.createElement('tr');

    let flag = document.createElement('div')
    flag.classList.add("currency-flag", `currency-flag-${countryCode}`);

    let rateData = document.createElement('td');
    rateData.innerText = rate;

    let rateExchange = document.createElement('td');
    rateExchange.innerText = exchange;

    row.appendChild(flag);
    row.appendChild(rateData);
    row.appendChild(rateExchange);
    return row;
}

function renderTable(object) {
    document.querySelector('tbody').innerHTML = '';
    for (let key in object) {
        let countryCode = key.toLowerCase();
        document.querySelector('tbody').appendChild(tableElementCreator(key, object[key], countryCode));
    }
}

export default function renderUI(object){
  renderTable(object.rates)
  document.querySelector("#date").innerText = object.date;
  for (let key in object.rates) {
    $dropdownMenu.appendChild(dropdownOptionCreator(key));
  }
}

export function eventHandlers(callback){
  $dropdownMenu.onclick = function (e) {
      if (e.target.classList.contains('dropdown-item')) {
          let currency = e.target.innerText;
          document.querySelector("#currency").innerText = e.target.innerText;
          let flag = document.createElement('div')
          flag.classList.add("currency-flag", `currency-flag-${e.target.innerText.toLowerCase()}`);
          document.querySelector("#flag").innerHTML = '';
          document.querySelector("#flag").appendChild(flag);
          callback(`https://api.exchangeratesapi.io/latest?base=${currency}`)
      }
  }

  $form.onsubmit = function(){
      event.preventDefault();
      let currency;
      if (document.querySelector("#currency").innerText != "EUR (default)"){
          currency = document.querySelector("#currency").innerText;
          callback(`https://api.exchangeratesapi.io/${$dateInput.value}?base=${currency}`);
      }
      else{
          callback(`https://api.exchangeratesapi.io/${$dateInput.value}`);
      }
  }
}

