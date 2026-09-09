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
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5bbfc',
          400: '#8196f8',
          500: '#6370f1',
          600: '#4f4ee5',
          700: '#413eca',
          800: '#3535a3',
          900: '#2f3181',
          950: '#1c1d4d',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea6c0e',
          700: '#c2570c',
          800: '#9a4412',
          900: '#7c3811',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          500: '#eab308',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        surface: {
          900: '#0a0b14',
          800: '#0f1020',
          750: '#111827',
          700: '#161829',
          600: '#1c1f35',
          500: '#232641',
          400: '#2a2e50',
          300: '#343861',
        },
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99, 112, 241, 0.25), transparent)',
        'card-glow': 'linear-gradient(135deg, rgba(99,112,241,0.1) 0%, rgba(249,115,22,0.05) 100%)',
      },
      boxShadow: {
        'glow-brand': '0 0 20px rgba(99,112,241,0.3)',
        'glow-accent': '0 0 20px rgba(249,115,22,0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)',
        'card-hover': '0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,112,241,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-subtle': 'bounceSubtle 1s ease-in-out infinite',
        'xp-gain': 'xpGain 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(99,112,241,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(99,112,241,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        xpGain: {
          '0%': { opacity: '0', transform: 'translateY(0) scale(0.8)' },
          '50%': { opacity: '1', transform: 'translateY(-20px) scale(1.1)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
