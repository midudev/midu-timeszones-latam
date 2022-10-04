import countriesData from './allCountries.json'
import { openingModal } from './dialog'
import { $, addFavorite, getDataFromStorage, removeFavorite, showTimeResults } from './utils'

const $btnSearchCountries = $('#searchCountries')
const $inputSearch = $('#search')
const $searchList = $('#searchList')

let handler

const getItemCountry = (country) => {
  const {name, emoji } = country
  const storageData = getDataFromStorage('countries')
  const isFavorite = storageData.find(cou => cou.name === name)
  const className = `fav${name.replaceAll(' ', '')}`
  return `
  <li role="option" class="search-hit">
    <div class="container-hit">
      <div class="hit-flag-icon">${emoji}</div>
      <div class="hit-country-name">
        <span>${name}</span>
      </div>
      <div class="hit-action ${className}" data-country="${name}" data-favorite="${Boolean(isFavorite)}">
        <svg 
          class="${className}" 
          data-country="${name}" 
          data-favorite="${Boolean(isFavorite)}" 
          height="21" 
          viewBox="0 0 21 21" 
          width="21" 
          xmlns="http://www.w3.org/2000/svg">
            <path 
              d="m7.5 11.5-5 3 2-5.131-4-3.869h5l2-5 2 5h5l-4 4 2 5z" class="${className}" 
              data-country="${name}" data-favorite="${Boolean(isFavorite)}" 
              fill="${Boolean(isFavorite) ? "white": "none"}" 
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"
            />
        </svg>
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

  const svgPath = $(`path[data-country="${countryName}"]`)
  const star = document.querySelectorAll(`.fav${countryName.replaceAll(' ', '')}`)
  const isFavorite = favorite === 'true'
  // I did this because dataset returns a string
  if(isFavorite) {
    removeFavorite(countryName)
  }else {
    const country = countriesData.find(c => c.name.toLowerCase() === countryName.toLowerCase())
    addFavorite(country)
  }

  star.forEach(s => s.dataset.favorite = !isFavorite )
  const pathFill = isFavorite ? 'none' : 'white'
  svgPath.setAttribute('fill', pathFill)
  // Refreshing data with new favorites
  $('textarea').value = showTimeResults($('input').value)
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