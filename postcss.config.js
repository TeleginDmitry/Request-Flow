module.exports = {
  plugins: [
    require("postcss-preset-env")({
      stage: 0, // Используем экспериментальные фичи CSS
    }),
  ],
};
