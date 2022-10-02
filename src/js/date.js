import { $section } from './utils'

export const changeTimeZone = (date, timeZone) => {
  const dateToUse = typeof date === 'string'
    ? new Date(date)
    : date

  return new Date(dateToUse.toLocaleString('en-US', {
    timeZone
  }))
}

export const transformDateToString = (date, dateFormat) => {
  const localCode = dateFormat ? 'en-US' : 'es-ES'
  const localDate = date.toLocaleString(localCode, {
    hour12: dateFormat,
    hour: 'numeric',
    minute: 'numeric'
  })

  if (dateFormat && localDate.includes(':00')) localDate.replace(':00', '').padStart(5, '0')
  if (dateFormat && !localDate.includes(':00')) localDate.padStart(8, '0')
  if (dateFormat && localDate.includes(':00')) localDate.replace(':00', 'H').padStart(4, '0')

  return (`${localDate} H`).padStart(7, '0')
}

export const copyTextArea = async () => {
  await navigator.clipboard.writeText($section.value)
}
