/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./fragments/**/*.vue",
    "./App.{js,ts,vue}",
    "./app.{js,ts,vue}",
    "./Error.{js,ts,vue}",
    "./error.{js,ts,vue}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',  // Adds padding to the container
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1200px',
        },
      },
      fontFamily: {
        "montserrat": ["Montserrat"]
      },
      colors: {
        putih: {
          50: "#FAFDF4",
          100: "#F6F6F6"
        },
        hijau: {
          100: "#e9eed9",
          200: "#d4dfb7",
          300: "#b8ca8c",
          400: "#DFF38D",
          500: "#96AF5C",
          550: "#CFED54",
          600: "#D6DF24"
        },
        abu: {
          100: "#C9C9C9",
          300: "#D0D5DD",
          500: "#5A5A5A",
          700: "#344054",
          900: "#5E7065"
        },
        biru: {
          100: "#47B9D2",
          300: "#25326D",
          500: "#26326E",
          600: "#212C5B",
          700: "#132642",
          900: "#0259C7"
        },
        navy: {
          1: "#1A2036"
        },
        valencia: {
          50: "#fdf3f3",
          100: "#fbe5e5",
          200: "#f8d0d0",
          300: "#f2afaf",
          400: "#e88181",
          500: "#d84848",
          600: "#c73b3b",
          700: "#a72e2e",
          800: "#8b2929",
          900: "#742828",
          950: "#3e1111"
        },
        "stardust": {
          50: "#f7f7f7",
          100: "#ededed",
          200: "#dfdfdf",
          300: "#c8c8c8",
          400: "#adadad",
          500: "#a0a0a0",
          600: "#888888",
          700: "#7b7b7b",
          800: "#676767",
          900: "#545454",
          950: "#363636"
      },
      },
      zIndex: {
        5: 5,
        60: 60,
        100: 100,
        110: 110
      },
      borderRadius: {
        header: "24px",
        card: "16px"
      },
      boxShadow: {
        global: "-4px 4px 24px 0px #00000026",
        input: "0px 0px 0px 4px #F4FFEB"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@headlessui/tailwindcss")
  ],
};