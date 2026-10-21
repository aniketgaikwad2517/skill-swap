/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#090A10',
          secondary: '#0F111A',
          tertiary: '#161926',
          card: '#131622',
          surface: '#1A1E2E',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          violet: '#8B5CF6',
          'violet-dark': '#7C3AED',
          'violet-glow': '#A855F7',
          cyan: '#06B6D4',
          'cyan-glow': '#22D3EE',
          navy: '#0B0F19',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-sm': '0 0 15px -3px rgba(139, 92, 246, 0.25)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'card-hover': '0 20px 40px -15px rgba(124, 58, 237, 0.15), 0 0 0 1px rgba(139, 92, 246, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
