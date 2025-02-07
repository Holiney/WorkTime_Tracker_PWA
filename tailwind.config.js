module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af", // Додаємо власний колір
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Додаємо власний шрифт
      },
    },
  },
  plugins: [],
};
