import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)'
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)'
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)'
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)'
      },
      transitionTimingFunction: {
        bold: 'var(--easing)'
      }
    }
  },
  plugins: []
} satisfies Config
