import { toast } from 'https://cdn.skypack.dev/wc-toast'
import countries from './countries.json'
import { $, setInitialDate } from './utils'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'

polyfillCountryFlagEmojis()

function changeTimeZone (date, timeZone) {
  const dateToUse = typeof date === 'string'
    ? new Date(date)
    : date

  return new Date(dateToUse.toLocaleString('en-US', {
    timeZone
  }))
}

const $input = $('input')
const $section = $('section')

$input.addEventListener('change', () => {
  const date = $input.value

  const mainDate = new Date(date)

  const times = {}

  countries.forEach(country => {
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

  const html = sortedTimesEntries.map(([hour, countries]) => {
    const flags = countries.map(country => `${country.emoji}`).join(' ')
    return `<article><span>${hour}H</span><p>${flags}</p></article>`
  })

  // copiamos en el portapapeles el código
  navigator.clipboard.writeText(html)
    .then(() => {
      toast('¡Copiado al portapeles!', {
        icon: {
          type: 'success'
        }
      })
    })

  $section.innerHTML = html.join('')
})

setInitialDate()
