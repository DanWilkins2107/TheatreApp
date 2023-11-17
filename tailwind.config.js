/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.js",
        "./screens/**/*.jsx",
        "./components/*.jsx",
        "./components/**/*.jsx",
    ], //Add other files to watch here
    theme: {
        extend: {},
    },
    plugins: [],
};
