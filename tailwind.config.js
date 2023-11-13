/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.js",
        "./screens/LoginScreens/LoginScreen.jsx",
        "./screens/LoginScreens/SignUpScreen.jsx",
        "./screens/LoginScreens/ForgottenPasswordScreen.jsx",
    ], //Add other files to watch here
    theme: {
        extend: {},
    },
    plugins: [],
};
