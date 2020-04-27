import { getData } from './api.js'
import renderUI, { eventHandlers } from './ui.js'

function exchangeRates(url){
  getData(url)
    .then(res => renderUI(res))
}

function initialize(){
  exchangeRates()
  eventHandlers(exchangeRates)
}

initialize()

