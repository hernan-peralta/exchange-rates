const BASE_URL = "https://api.exchangeratesapi.io"

export function getData(url = `${BASE_URL}/latest`) {
  return fetch(url)
    .then(res => res.json())
    .catch(error => console.error("Failed", error));
}

