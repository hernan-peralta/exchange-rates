import { getData } from './api.js'
import renderUI, { eventHandlers } from './ui.js'

async function exchangeRates(url){
  await getData(url)
    .then(res => renderUI(res))
}

function initialize(){
  exchangeRates()
  eventHandlers(exchangeRates)
}

initialize()

