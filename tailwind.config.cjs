/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Emoji: 'Twemoji Country Flags',
        CascadiaCodePL: 'Cascadia Code PL',
        CascadiaCodePLItalic: 'Cascadia Code PL Italic'
      }
    }
  },
  plugins: []
}
