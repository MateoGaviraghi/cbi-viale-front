import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B8935A',
          50: '#FAF6EF',
          100: '#F1E7D3',
          200: '#E3CFA8',
          300: '#D3B47C',
          400: '#C4A068',
          500: '#B8935A',
          600: '#A07B48',
          700: '#8A6D3F',
          800: '#6B5431',
          900: '#4A3A22',
        },
        beige: {
          DEFAULT: '#F5F0E8',
          soft: '#FAF7F2',
          warm: '#F0E9DC',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#6B6B6B',
          soft: '#9A9A9A',
        },
        line: {
          DEFAULT: '#E5DED1',
          soft: '#EFEAE0',
          strong: '#C9BEA9',
        },
        danger: {
          DEFAULT: '#B8401F',
          soft: '#E8D3CB',
        },
        background: '#FFFFFF',
        foreground: '#1A1A1A',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // base body at 17px, generous scale toward editorial
        xs: ['0.8125rem', { lineHeight: '1.6' }],
        sm: ['0.9375rem', { lineHeight: '1.65' }],
        base: ['1.0625rem', { lineHeight: '1.7' }],
        lg: ['1.1875rem', { lineHeight: '1.7' }],
        xl: ['1.375rem', { lineHeight: '1.55' }],
        '2xl': ['1.75rem', { lineHeight: '1.4' }],
        '3xl': ['2.25rem', { lineHeight: '1.25' }],
        '4xl': ['2.75rem', { lineHeight: '1.15' }],
        '5xl': ['3.5rem', { lineHeight: '1.05' }],
        '6xl': ['4.5rem', { lineHeight: '1.0' }],
        '7xl': ['5.75rem', { lineHeight: '0.98' }],
        '8xl': ['7.25rem', { lineHeight: '0.95' }],
      },
      // reglas innegociables: border-radius 0 en todo.
      // se deja `full` por si hace falta un dot/circle utilitario.
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '44': '11rem',
        '52': '13rem',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        tight: '-0.015em',
        normal: '0',
        wide: '0.025em',
        wider: '0.08em',
        widest: '0.18em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-up': 'fade-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 400ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
