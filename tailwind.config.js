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
        // Luxury Obsidian & Electric Aura Theme
        lumen: {
          void: '#070A12',       // Absolute deepest obsidian void
          dark: '#0B0F19',       // Deep midnight canvas
          darker: '#090D16',
          sidebar: '#0D1322',    // Luxury dark sidebar
          surface: '#131B2E',    // Dark card surface
          hover: '#1B243B',      // Dark hover surface
          border: '#1E293B',     // Dark border
          
          // Electric Violet / Indigo (Primary Brand Aura)
          indigo: '#6366F1',
          'indigo-light': '#818CF8',
          'indigo-dark': '#4F46E5',
          'indigo-glow': '#4338CA',
          'indigo-50': '#EEF2FF',
          'indigo-100': '#E0E7FF',
          
          // Cyber Cyan / Aqua (Secondary Telemetry Accent)
          cyan: '#06B6D4',
          'cyan-light': '#38BDF8',
          'cyan-dark': '#0891B2',
          'cyan-50': '#ECFEFF',
          
          // Neon Coral / Rose (High Priority Deals & Alerts)
          coral: '#F43F5E',
          'coral-light': '#FB7185',
          'coral-dark': '#E11D48',
          'coral-50': '#FFF1F2',

          // Emerald Matrix (Growth & Approvals)
          emerald: '#10B981',
          'emerald-light': '#34D399',
          'emerald-dark': '#059669',
          'emerald-50': '#ECFDF5',

          // Amber Matrix
          amber: '#F59E0B',
          'amber-light': '#FBBF24',
          'amber-dark': '#D97706',
          'amber-50': '#FFFBEB',

          // Clean Canvas UI
          bg: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#64748B',
          subtle: '#94A3B8',
        },
        // Backward compatibility mappings so legacy classes stay clean
        shopsense: {
          dark: '#0B0F19',
          darker: '#070A12',
          sidebar: '#0D1322',
          hover: '#1B243B',
          surface: '#131B2E',
          teal: '#6366F1',
          'teal-dark': '#4F46E5',
          'teal-light': '#818CF8',
          'teal-50': '#EEF2FF',
          'teal-100': '#E0E7FF',
          emerald: '#10B981',
          'emerald-dark': '#059669',
          accent: '#F59E0B',
          'accent-light': '#FEF3C7',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          dark: '#0B0F19',
          sidebar: '#0D1322',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'lumen-card': '0 4px 20px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -2px rgba(15, 23, 42, 0.04)',
        'lumen-hover': '0 16px 36px -8px rgba(99, 102, 241, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.06)',
        'lumen-glow': '0 0 30px -5px rgba(99, 102, 241, 0.35)',
        'lumen-cyan-glow': '0 0 30px -5px rgba(6, 182, 212, 0.35)',
        'lumen-coral-glow': '0 0 30px -5px rgba(244, 63, 94, 0.35)',
        'lumen-dark-card': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.07)',
      },
    },
  },
  plugins: [],
}

