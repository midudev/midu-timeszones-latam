import { $ } from './utils'

const $dialog = $('dialog')

$dialog.addEventListener('click',(e) => {
  if (e.target.nodeName === 'DIALOG') $dialog.close();
})

export const openingModal = () => {
  if(typeof $dialog.showModal === "function") {
    $dialog.showModal()
  } else {
    console.log('Fallback here!')
  }
}

