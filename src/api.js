const BASE_URL = "https://api.exchangeratesapi.io"

class Rates {
  constructor(resJSON){
    this.base = resJSON.base;
    this.date = resJSON.date;
    this.rates = resJSON.rates
  }
}

export async function getData(url = `${BASE_URL}/latest`){
  try {
    const response = await fetch(url)
    const responseJSON = await response.json()
    return new Rates(await responseJSON)
  }
  catch (err) {
    err =>  console.error("Pssst, hey, there was an error: ", err)
  }
}

