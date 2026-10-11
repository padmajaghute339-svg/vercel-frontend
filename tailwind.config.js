/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        haldiram: {
          red: '#8B0000',
          'red-dark': '#5E0000',
          'red-light': '#A61B1B',
          'red-crimson': '#9C0D0D',
          cream: '#FFFDF7',
          'cream-warm': '#F9F5EC',
          'cream-muted': '#EFE8D8',
          saffron: '#FF6B00',
          'saffron-light': '#FF8A33',
          gold: '#FFB703',
          'gold-light': '#FFD166',
          brown: '#23140F',
          'brown-dark': '#150B07',
          pistachio: '#32662C',
          cardamom: '#498B43',
        }
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Syne"', '"Playfair Display"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        accent: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.06em',
        tightest: '-0.09em',
        mega: '0.25em',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-very-slow': 'spin 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.82' },
        }
      }
    },
  },
  plugins: [],
}
