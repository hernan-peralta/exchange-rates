const $dropdownMenu = document.querySelector(".dropdown-menu");


function getData(url) { 
    fetch(url)
        .then(res => res.json())

        .then(respuestaJSON => {
            populateDropdownMenu(respuestaJSON.rates);

            document.querySelector("#date").innerText = respuestaJSON.date;
            renderTable(respuestaJSON.rates);
        })

        .catch(error => console.error("FALLÓ", error));
}


function populateDropdownMenu(object) {
    for (keys in object) {
        $dropdownMenu.appendChild(dropdownOptionCreator(keys));
    }
}


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
    for (key in object) {
        let countryCode = key.toLowerCase();
        document.querySelector('tbody').appendChild(tableElementCreator(key, object[key], countryCode));
    }
}


$dropdownMenu.onclick = function (e) {
    if (e.target.classList.contains('dropdown-item')) {
        let currency = e.target.innerText;        
        document.querySelector("#currency").innerText = e.target.innerText;
        let flag = document.createElement('div')
        flag.classList.add("currency-flag", `currency-flag-${e.target.innerText.toLowerCase()}`);
        document.querySelector("#flag").innerHTML = '';
        document.querySelector("#flag").appendChild(flag);
        getData(`https://api.exchangeratesapi.io/latest?base=${currency}`);
    }
}

getData("https://api.exchangeratesapi.io/latest");
