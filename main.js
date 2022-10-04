
import countries from './countries.json'
import { $, getDataFromStorage, setInitialDate, showTimeResults } from './utils'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'

polyfillCountryFlagEmojis()

function initData() {
  const countriesStorage = getDataFromStorage('countries')
  if(countriesStorage.length === 0) localStorage.setItem('countries', JSON.stringify(countries))
}

const $input = $('input')
const $textarea = $('textarea')

$input.addEventListener('change', () => {
  const date = $input.value
  const html = showTimeResults(date)
  $textarea.value = html
})

setInitialDate()
initData()