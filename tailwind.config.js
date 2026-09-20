/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // short laptop screens (viewport height), e.g. 1920x1080 at 125% zoom
        short: { raw: "(max-height: 780px)" },
      },
    },
  },
  plugins: [],
}