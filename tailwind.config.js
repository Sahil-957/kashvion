/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
    './navigation/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './services/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#1A237E',
        secondary: '#FFD700',
        tertiary: '#FFBF00',
        background: '#F8F9FA',
        surface: '#FCFCFD',
        'surface-muted': '#F1F2F5',
        'surface-soft': '#F3F4F7',
        'text-primary': '#111111',
        'text-secondary': '#6B7280',
        border: '#D7DBE3',
        'border-strong': '#B9C0CF',
        ink: '#2E3138',
        success: '#1F8A4D',
        danger: '#C0392B',
        warning: '#8A6B00',
      },
      fontFamily: {
        inter: ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        manrope: ['Manrope_700Bold'],
        'manrope-extrabold': ['Manrope_800ExtraBold'],
      },
    },
  },
  plugins: [],
};
