/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        token: {
          border: '#363B3D',
          bgForest: '#1A5C38',
          accentRed: '#DF3B3B',
          accentGreen: '#0D9467',
          accentBlue: '#4A89E2',
          textSec1: '#9D9487',
          textSec2: '#AAA297',
          accentCyan: '#42C0F8',
          textLight1: '#CFCBC4',
          textLight2: '#C6D4E2',
          accentMint: '#4FF0BA',
          textBody: '#E8E6E3',
          darkBase: '#111415',
          darkCard: '#181C1E',
          darkHover: '#22282A',
          darkInput: '#131718',
        }
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
        'lg': '6px',
        'full': '9999px',
      },
      boxShadow: {
        'erp-sm': '0px 2px 4px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px inset rgba(255, 255, 255, 0.05), 0px -1px 1px 0px inset rgba(0, 0, 0, 0.2)',
        'erp-md': '0px 8px 16px -3px rgba(0, 0, 0, 0.55)',
        'erp-drawer': '-6px 0px 25px rgba(0, 0, 0, 0.6)',
      }
    }
  },
  plugins: [],
};
