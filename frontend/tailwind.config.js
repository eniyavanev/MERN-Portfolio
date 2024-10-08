/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#001B48",
        sketch: "#02457A",
        tshirt: "#018ABE",
        soap: "#97CADB",
        light: "#D6E8EE",
      },
    },
  },
  plugins: [],
};
