/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'hsl(var(--ivory) / <alpha-value>)',
        sand: 'hsl(var(--sand) / <alpha-value>)',
        stone: 'hsl(var(--stone) / <alpha-value>)',
        charcoal: 'hsl(var(--charcoal) / <alpha-value>)',
        line: 'hsl(var(--line) / <alpha-value>)',
        gold: 'hsl(var(--gold) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Alpago-style bold uppercase grotesque for section titles / labels
        grotesk: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        800: '800ms',
        1200: '1200ms',
        1400: '1400ms',
      },
      keyframes: {
        'reveal-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'dot-pulse': {
          '0%': { boxShadow: '0 0 0 0 hsl(var(--gold) / 0.55)' },
          '70%': { boxShadow: '0 0 0 7px hsl(var(--gold) / 0)' },
          '100%': { boxShadow: '0 0 0 0 hsl(var(--gold) / 0)' },
        },
      },
      animation: {
        'reveal-line': 'reveal-line 1s cubic-bezier(0.16,1,0.3,1) forwards',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
