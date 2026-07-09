/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        background: 'hsl(201, 100%, 6%)',
        foreground: 'hsl(0, 0%, 100%)',
        muted: {
          DEFAULT: 'hsl(0, 0%, 10%)',
          foreground: 'hsl(240, 4%, 66%)',
        },
        primary: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(201, 100%, 6%)',
        },
        secondary: 'hsl(0, 0%, 10%)',
        accent: 'hsl(0, 0%, 10%)',
        border: 'hsl(0, 0%, 18%)',
        input: 'hsl(0, 0%, 18%)',
      },
      keyframes: {
        fadeRise: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-rise': 'fadeRise 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
