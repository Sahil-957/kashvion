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
        primary: '#050505',
        secondary: '#FFC61A',
        tertiary: '#E3AF00',
        background: '#FFFCF4',
        surface: '#FFFFFF',
        'surface-muted': '#FFF5CF',
        'surface-soft': '#FFF8E3',
        'text-primary': '#0A0A0A',
        'text-secondary': '#6F6A5F',
        border: '#E8DFC3',
        'border-strong': '#D7C788',
        ink: '#161616',
        success: '#1F8A4D',
        danger: '#C0392B',
        warning: '#9A6B00',
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
