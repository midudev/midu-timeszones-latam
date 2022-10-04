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