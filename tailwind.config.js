module.exports = {
  content: ['./src/**/*.{htm,html,js,jsx,ts,tsx}', './public/index.html'],
  important: true,
  theme: {
    extend: {
      colors: {
        'gray-900': '#2C2C2E',
        'light-gray': '#E2E4E9',
        error: '#FF4841',
      },
      fontFamily: {
        skadi: ['Skranji'],
      },
    },
  },
  plugins: [],
};
