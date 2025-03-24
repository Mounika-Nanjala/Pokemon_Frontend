/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // Dark Mode Support
    content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                pokemon: {
                    lightBg: "#f8f9fa", // Helles, neutrales Weiß für Light Mode
                    darkBg: "#121212", // Dunkles, aber nicht schwarzes Grau
                    navbarDark: "#1f1f1f", // Dezente, dunkle Navbar
                    navbarLight: "#f4f4f4", // Weiße Navbar für Light Mode
                    textDark: "#e0e0e0", // Hellgrau für Lesbarkeit im Dark Mode
                    textLight: "#333333", // Dunkelgrau für Text im Light Mode
                    accent: "#ffcc00", // Dezentes Pokémon-Gelb für Highlights
                },
            },
            keyframes: {
                subtleBounce: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-6px)" }, // Weniger hoch springen
                },
            },
            animation: {
                subtleBounce: "subtleBounce 1s infinite ease-in-out",
            },
        },
    },
    plugins: [import("daisyui")], // Replace `require` with `import()`
};
