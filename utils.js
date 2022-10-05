import { toast } from 'https://cdn.skypack.dev/wc-toast'

export const $ = (selector) => document.querySelector(selector)
// const $$ = selector => document.querySelectorAll(selector)

function roundToNextHour (date) {
  date.setHours(date.getHours() + Math.ceil(date.getMinutes() / 60))
  date.setMinutes(0, 0, 0)
  return date
}

/**
 * It rounds the current date to the neareast next hour,
 * converts it to ISO format in local timezone,
 * then removes seconds and milliseconds from the ISO string
 * and finally set the resulting string-date into the date input.
 */
export const setInitialDate = () => {
  const dt = roundToNextHour(new Date())
  // console.log(dt.toISOString()) // -> 2022-09-01T02:00:00.000Z
  // console.log(dt.getTimezoneOffset()) // -> 240 (GMT-4)

  const tzOffset = dt.getTimezoneOffset() * 60 * 1000
  const localTs = dt.getTime() - tzOffset
  const localDate = new Date(localTs)
  // console.log(localDate.toISOString()) // -> 2022-08-31T22:00:00.000Z

  const iso = localDate.toISOString().slice(0, 16) // keep the first 16 chars (YYYY-MM-DDTHH:mm)
  // console.log(iso) -> '2022-08-31T22:00'

  $('input').value = iso
}

export const getDataFromStorage = (path) => {
  const data = localStorage.getItem(path)
  return data ? JSON.parse(data) : [] 
}

export const setDataToStorage = (path, data) => {
  localStorage.setItem(path, JSON.stringify(data))
}

export const addFavorite = (country) => {
  const data = getDataFromStorage('countries')
  const newData = data.concat(country)
  setDataToStorage('countries', newData)
}
export const removeFavorite = (countryName) => {
  const data = getDataFromStorage('countries')
  const newData = data.filter(c => c.name !== countryName)
  setDataToStorage('countries', newData)
}

const changeTimeZone = (date, timeZone) => {
  const dateToUse = typeof date === 'string'
    ? new Date(date)
    : date

  return new Date(dateToUse.toLocaleString('en-US', {
    timeZone
  }))
}

const transformDateToString = (date) => {
  const localDate = date.toLocaleString('es-ES', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  })

  return localDate.replace(':00', 'H')
}

const copyTextArea = async (content) => {
  await navigator.clipboard.writeText(content)
}


export const showTimeResults = (date,cb) => {
  const mainDate = new Date(date)
  const times = {}
  const storageData = getDataFromStorage('countries')
  const countriesData = storageData.length > 0 ? storageData : countries
  countriesData.forEach((country) => {
    const { country_code: code, emoji, timezones } = country
    const [timezone] = timezones

    const dateInTimezone = changeTimeZone(mainDate, timezone)
    const hour = dateInTimezone.getHours()

    times[hour] ??= []

    times[hour].push({
      date: dateInTimezone,
      code,
      emoji,
      timezones
    })
  })

  const sortedTimesEntries = Object
    .entries(times)
    .sort(([timeA], [timeB]) => timeB - +timeA)

  console.log(sortedTimesEntries)

  const html = sortedTimesEntries.map(([, countries]) => {
    const flags = countries.map(country => `${country.emoji}`).join(' ')
    const [country] = countries
    const { date } = country

    return `${transformDateToString(date)} ${flags}`
  }).join('\n')

  // copiamos en el portapapeles y mostramos la notificación
  copyTextArea(html).then(cb)

  return html
}

export const showToast = (message, type) => {
  toast(message, {
    icon: {
      type
    }
  })
}