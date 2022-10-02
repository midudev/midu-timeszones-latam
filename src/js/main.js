import { toast } from 'wc-toast'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'
import { copyTextArea } from './date'
import { $input, showUTCHours, setInitialDate } from './utils'

$input.addEventListener('change', async () => {
  showUTCHours()
  polyfillCountryFlagEmojis()

  // copiamos en el portapapeles y mostramos la notificación
  await copyTextArea().then(() => {
    toast('¡Copiado al portapeles! ', {
      icon: {
        type: 'custom',
        content: '✅'
      },
      theme: {
        type: 'custom',
        style: {
          background: 'dark:bg-blue-500 bg-blue-500',
          color: 'text-white dark:text-black'
        }
      }
    })
  })
})

setInitialDate()
