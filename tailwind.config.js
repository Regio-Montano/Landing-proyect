/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          darker: '#050508',
          dark: '#0a0a10',
          card: '#0d0d14',
          blue: '#0066FF',
          'blue-bright': '#00A3FF',
          'blue-glow': 'rgba(0,102,255,0.35)',
          gold: '#D4AF37',
          'gold-bright': '#FFD700',
          'gold-glow': 'rgba(212,175,55,0.3)',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'float-up': {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-100px) scale(1)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,102,255,0.3), 0 0 40px rgba(0,102,255,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(0,102,255,0.6), 0 0 80px rgba(0,102,255,0.3)' },
        },
        'gold-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'tilt-3d': {
          '0%, 100%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)' },
          '75%': { transform: 'perspective(1000px) rotateX(-2deg) rotateY(2deg)' },
        },
      },
      animation: {
        'float-up': 'float-up linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gold-shimmer': 'gold-shimmer 3s linear infinite',
        'tilt-3d': 'tilt-3d 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
