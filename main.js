
import countries from './countries.json'
import { $, getDataFromStorage, setInitialDate, showTimeResults, showToast } from './utils'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'

polyfillCountryFlagEmojis()

function initData() {
  const countriesStorage = getDataFromStorage('countries')
  if(countriesStorage.length === 0) localStorage.setItem('countries', JSON.stringify(countries))
}

const $input = $('input')
const $textarea = $('textarea')

const fillTextArea = (date, cb) => {
  const html = showTimeResults(date, cb)
  $textarea.value = html
}

$input.addEventListener('change', () => {
  const date = $input.value
  fillTextArea(date, showToast('¡Copiado al portapeles!', 'success'))
})

const onLoad = () => {
  setInitialDate()
  fillTextArea($input.value, () => { console.log('Copied!') })
  initData()
}

onLoad()
