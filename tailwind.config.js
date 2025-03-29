import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        stone: colors.stone,
        gray: colors.gray,
        gogogol: "#fa434f",
      },
    },
  },
  plugins: [],
};
