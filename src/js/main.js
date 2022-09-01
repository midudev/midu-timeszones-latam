import { toast } from 'wc-toast'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'
import { copyTextArea } from './date'
import { $input, fillTextArea, setInitialDate } from './utils'

$input.addEventListener('change', async () => {
  polyfillCountryFlagEmojis()
  fillTextArea()
  // copiamos en el portapapeles y mostramos la notificación
  await copyTextArea().then(() => {
    toast('¡Copiado al portapeles!', {
      icon: {
        type: 'success'
      }
    })
  })
})

setInitialDate()
