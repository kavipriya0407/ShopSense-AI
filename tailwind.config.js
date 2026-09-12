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
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          dark: '#0B0F19',
          sidebar: '#090D16',
        },
        shopzone: {
          orange: '#FF5722',
          'orange-hover': '#F4511E',
          'orange-light': '#FFF3E0',
          navy: '#131921',
          header: '#18181B',
          banner: '#0A2540',
          green: '#16A34A',
          gray: '#F8FAFC',
        },
        cyber: {
          purple: '#8B5CF6',
          indigo: '#6366F1',
          cyan: '#06B6D4',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
          dark: '#090D16',
          card: '#111726',
          border: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.35)',
        'neon-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'neon-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'neon-purple': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      }
    },
  },
  plugins: [],
}
