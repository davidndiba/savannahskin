/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        savanna: {
          cream: '#F5EFE6',
          'cream-dark': '#EDE3D5',
          sand: '#D4B896',
          'sand-dark': '#C4A07C',
          earth: '#8B6B4A',
          'earth-dark': '#6D5038',
          bark: '#4A3728',
          sage: '#7A9B7A',
          'sage-light': '#9BB89B',
          'sage-dark': '#5A7A5A',
          olive: '#6B7C5C',
          'olive-light': '#8A9A78',
          warm: '#E8D5C0',
          'warm-dark': '#D4BC9E',
          muted: '#A89080',
          charcoal: '#2C2018',
          'off-white': '#FAF7F4',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Georgia"', 'serif'],
        sans: ['"Nunito Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 20px rgba(74, 55, 40, 0.08)',
        medium: '0 4px 32px rgba(74, 55, 40, 0.12)',
        strong: '0 8px 48px rgba(74, 55, 40, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
