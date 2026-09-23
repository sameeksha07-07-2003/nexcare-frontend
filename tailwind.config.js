/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
   theme: {
    extend: {
      colors: {
        nexcare: {
          navy: "#10273F",
          teal: "#0EA394",
          tealDark: "#0B7F73",
          tealLight: "#E3F6F4",
          canvas: "#F6FBFA",
          success: "#219653",
          textSecondary: "#54708A",
          border: "#DCEDEF",
          surfaceSoft: "#F2F9FA",
        },
      },
      fontFamily: {
        heading: ["\"Plus Jakarta Sans\"", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

/**
 * Merge this `colors.nexcare` block into your existing tailwind.config.js
 * theme.extend — do not replace your whole config, just add this key.
 *
 * Example usage after merging: text-nexcare-navy, bg-nexcare-teal, bg-nexcare-tealLight
 */
