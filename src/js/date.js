import { $textarea } from './utils'

export const changeTimeZone = (date, timeZone) => {
  const dateToUse = typeof date === 'string'
    ? new Date(date)
    : date

  return new Date(dateToUse.toLocaleString('en-US', {
    timeZone
  }))
}

export const transformDateToString = (date) => {
  const localDate = date.toLocaleString('es-ES', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  })

  return localDate.replace(':00', 'H')
}

export const copyTextArea = async () => {
  await navigator.clipboard.writeText($textarea.value)
}
