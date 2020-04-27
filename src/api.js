const BASE_URL = "https://api.exchangeratesapi.io"

class Rates {
  constructor(resJSON){
    this.base = resJSON.base;
    this.date = resJSON.date;
    this.rates = resJSON.rates
  }
}

export function getData(url = `${BASE_URL}/latest`) {
  return fetch(url)
    .then(res => res.json())
    .then(resJSON => new Rates(resJSON))
    .catch(error => console.error("Failed", error));
}

