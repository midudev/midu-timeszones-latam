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

const transformDateToString = (date, dateFormat) => {
  const localCode = dateFormat ? 'en-US' : 'es-Es'
  const localDate = date.toLocaleString(localCode, {
    hour12: dateFormat,
    hour: 'numeric',
    minute: 'numeric'
  })

  if (dateFormat && localDate.includes(':00')) return localDate.replace(':00', '').padStart(5, '0')
  if (dateFormat && !localDate.includes(':00')) return localDate.padStart(8, '0')
  if (!dateFormat && localDate.includes(':00')) return localDate.replace(':00', ' H').padStart(4, '0')

  return (`${localDate} H`).padStart(7, '0')
}

const $input = $('#date-time')
const $textarea = $('textarea')
const $switch = $('#date-format')

$input.addEventListener('change', () => {
  const date = $input.value
  const dateFormat = $switch.checked

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

  const html = sortedTimesEntries.map(([, countries]) => {
    const flags = countries.map(country => `${country.emoji}`).join(' ')
    const [country] = countries
    const { date } = country

    return `${transformDateToString(date, dateFormat)} ${flags}`
  }).join('\n')

  // copiamos en el portapapeles el código
  navigator.clipboard.writeText(html)
    .then(() => {
      toast('¡Copiado al portapeles!', {
        icon: {
          type: 'success'
        }
      })
    })

  $textarea.value = html
})

setInitialDate()
