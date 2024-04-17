/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,jsx,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [import("daisyui")],
}

