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

const transformDateToString = (date) => {
  const localDate = date.toLocaleString('es-ES', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  })

  return localDate.replace(':00', 'H')
}

const $input = $('input')
const $textarea = $('textarea')

const copyTextArea = async () => {
  await navigator.clipboard.writeText($textarea.value)
}

const fillTextArea = () => {
  const date = $input.value

  const mainDate = new Date(date)

  const times = {}

  countries.forEach((country) => {
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

  const html = sortedTimesEntries
    .map(([, countries]) => {
      const flags = countries.map((country) => `${country.emoji}`).join(' ')
      const [country] = countries
      const { date } = country

      return `${transformDateToString(date)} ${flags}`
    })
    .join('\n')

  $textarea.value = html
}

$input.addEventListener('change', () => {
  fillTextArea()

  // copiamos en el portapapeles y mostramos la notificación
  copyTextArea().then(() => {
    toast('¡Copiado al portapeles!', {
      icon: {
        type: 'success'
      }
    })
  })
})

const onLoad = async () => {
  setInitialDate()
  fillTextArea()
  await copyTextArea()
}

onLoad()
