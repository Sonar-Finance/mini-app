/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sf: {
          blue: {
            DEFAULT: "#00F2FF",
            dark: "#090C9B",
          },
          red: {
            DEFAULT: "#DE1A1A",
          },
        },
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
      },
      width: { "2px": "2px" },
      height: {
        navigation: "4.5rem",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
}
