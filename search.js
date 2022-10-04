import countriesData from './allCountries.json'
import { $, addFavorite, getDataFromStorage, removeFavorite } from './utils'

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
      <div class="hit-action" data-country="${name}" data-favorite="${Boolean(isFavorite)}">
        <svg data-country="${name}" data-favorite="${Boolean(isFavorite)}" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m7.5 11.5-5 3 2-5.131-4-3.869h5l2-5 2 5h5l-4 4 2 5z" data-country="${name}" data-favorite="${Boolean(isFavorite)}" fill="${Boolean(isFavorite) ? "white": "none"}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"/></svg>
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

$searchList.addEventListener('click', (e) => {
  const countryName = e.target.dataset.country
  const favorite = e.target.dataset.favorite
  if(!countryName || !favorite) return
  // I did this because dataset returns a string
  if(favorite === 'true') {
    removeFavorite(countryName)
  }else {
    const country = countriesData.find(c => c.name.toLowerCase() === countryName.toLowerCase())
    console.log(country)
    addFavorite(country)
  }
  const pathFill = favorite === 'true' ? 'none' : 'white'
  document.querySelector(`path[data-country=${countryName}]`).setAttribute('fill', pathFill);
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