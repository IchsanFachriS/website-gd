import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // FTTM ITB Brand Colors
        primary: {
          DEFAULT: '#002858',
          50: '#E6EBF2',
          100: '#B3C5DC',
          200: '#809FC6',
          300: '#4D79B0',
          400: '#1A539A',
          500: '#002858',
          600: '#002046',
          700: '#001834',
          800: '#001022',
          900: '#000810',
        },
        secondary: {
          DEFAULT: '#fd5308',
          50: '#FFF3ED',
          100: '#FFE0CC',
          200: '#FFCDAA',
          300: '#FFB188',
          400: '#FF9566',
          500: '#fd5308',
          600: '#CB4206',
          700: '#993105',
          800: '#662103',
          900: '#331002',
        },
        accent: {
          DEFAULT: '#00ffff',
          dark: '#00cccc',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['"Barlow Semi Condensed"', 'sans-serif'],
      },
      fontSize: {
        hero: ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
        h1: ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['1.875rem', { lineHeight: '1.4', fontWeight: '600' }],
        h4: ['1.5rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1500px',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config