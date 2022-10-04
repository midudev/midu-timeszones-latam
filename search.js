import countriesData from './allCountries.json'
import { $, getDataFromStorage } from './utils'

const $dialog = $('dialog')
const $btnSearchCountries = $('#searchCountries')
const $inputSearch = $('#search')
const $searchList = $('#searchList')

let handler

const openingModal = () => {
  if(typeof $dialog.showModal === "function") {
    $dialog.showModal()
  } else {
    console.log('Fallback here!')
  }
}

const getItemCountry = (country) => {
  const {name, emoji } = country
  const storageData = getDataFromStorage('countries')
  const isFavorite = storageData.find(cou => cou.name === name)
  return `
  <li role="option" class="search-hit">
    <div class="container-hit">
      <div class="hit-flag-icon">${emoji}</div>
      <div class="hit-country-name">
        <span>${name}</span>
      </div>
      <div class="hit-action">
        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m7.5 11.5-5 3 2-5.131-4-3.869h5l2-5 2 5h5l-4 4 2 5z" fill="${Boolean(isFavorite) ? "white": "none"}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"/></svg>
      </div>
    </div>
  </li>
  `
}

let htmlResults = ''
const listResults = (data) => {
  console.log(data)
  data.forEach(country => {
    htmlResults += getItemCountry(country)    
  })
  $searchList.innerHTML = htmlResults
}

$btnSearchCountries.addEventListener('click', openingModal)
$inputSearch.addEventListener('input', (e) => {
  const q = e.target.value.toLocaleLowerCase()
  htmlResults = ''
  if(q === '') {
    $searchList.innerHTML = htmlResults
    return
  }
  const dataCountries = countriesData.filter(c => c.name.toLocaleLowerCase().includes(q))
  listResults(dataCountries)
  
})

const removeHandler = () => window.removeEventListener('keydown', handler)
const setHandler = () => {
  removeHandler()
  handler = (e) => {
    if((e.ctrlKey || e.metaKey) && (e.code === 'KeyK')) {
      e.preventDefault()
      openingModal()
    }
  }
	window.addEventListener('keydown', handler)
}
setHandler()