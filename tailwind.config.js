/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          600: 'var(--primary-600)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          600: 'var(--accent-600)',
          50: 'var(--accent-50)',
        },
        text: 'var(--color-text)',
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      transitionTimingFunction: {
        bold: 'var(--easing)',
      },
      zIndex: {
        header: 'var(--z-header)',
        tooltip: 'var(--z-tooltip)',
        drawer: 'var(--z-drawer)',
        overlay: 'var(--z-overlay)',
      },
      spacing: {
        '1': 'var(--sp-1)',
        '2': 'var(--sp-2)',
        '3': 'var(--sp-3)',
        '4': 'var(--sp-4)',
        '5': 'var(--sp-5)',
        '6': 'var(--sp-6)',
        '8': 'var(--sp-8)',
        '10': 'var(--sp-10)',
      },
      fontSize: {
        's': 'var(--font-s)',
        'm': 'var(--font-m)',
        'l': 'var(--font-l)',
        'xl': 'var(--font-xl)',
        '2xl': 'var(--font-2xl)',
      },
    },
  },
  plugins: [],
}