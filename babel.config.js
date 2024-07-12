module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "nativewind/babel",
            "macros",
            "@babel/plugin-transform-export-namespace-from",
            "react-native-reanimated/plugin",
        ],
    };
};
