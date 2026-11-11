/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        clay: 'rgb(var(--clay) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        night: 'rgb(var(--night) / <alpha-value>)',
        'on-night': 'rgb(var(--on-night) / <alpha-value>)',
      },
      maxWidth: {
        site: '76rem',
      },
    },
  },
  plugins: [],
}
