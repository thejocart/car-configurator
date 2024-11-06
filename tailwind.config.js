/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-primary": "#004289",
        "custom-primary-200": "#0F5096",
        "custom-background": "#FEFEFE",
        "custom-background-200": "#F8F8F8",
        "custom-black": "#1C1C1C",
        "custom-base-300": "#969696",
        "custom-base-200": "#585757",
        "custom-error": "#EF4147",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
};
