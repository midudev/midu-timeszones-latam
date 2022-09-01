/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    '*.md'
  ],
  theme: {
    extend: {
      fontFamily: {
        emoji: ['Twemoji Country Flags', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif']
      }
    }
  },
  plugins: []
}
