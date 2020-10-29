module.exports = {
  plugins: [
    "postcss-nesting",
    "tailwindcss",
    ["cssnano", { preset: "default" }],
    "autoprefixer",
  ],
}