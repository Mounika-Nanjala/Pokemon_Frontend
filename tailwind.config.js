module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths based on your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
