/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f5ff',
          100: '#f1ebff',
          200: '#e8d9ff',
          300: '#d4b8ff',
          400: '#b88cff',
          500: '#8b5a96',
          600: '#7c4a85',
          700: '#6a3d6f',
          800: '#5a335c',
          900: '#4c2c4d',
        },
        secondary: {
          50: '#fef7fa',
          100: '#fdecf3',
          200: '#fbd9e8',
          300: '#f4a6cd',
          400: '#ed7db3',
          500: '#e55a9a',
          600: '#d13d7a',
          700: '#b02e62',
          800: '#8f2750',
          900: '#762443',
        },
        accent: {
          50: '#fff0f5',
          100: '#ffe0ec',
          200: '#ffc7d9',
          300: '#ffb6c1',
          400: '#ff8fa3',
          500: '#ff6b85',
          600: '#ed4a6b',
          700: '#c73a56',
          800: '#a53047',
          900: '#8a2b3c',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'scatter': 'scatter 1.2s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scatter: {
          '0%': { 
            transform: 'translate(var(--scatter-x, 0), var(--scatter-y, 0)) scale(1)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translate(var(--scatter-x, 0), var(--scatter-y, 0)) scale(0.8)',
            opacity: '0.7'
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'yarn-pattern': 'radial-gradient(circle at 20% 80%, rgba(139, 90, 150, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(244, 166, 205, 0.05) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 182, 193, 0.03) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
