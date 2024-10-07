// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.nodeModulesPaths = [
    path.resolve(__dirname, "node_modules"),
    path.resolve(__dirname, "../../shared"),
];

config.watchFolders = [path.resolve(__dirname, "../../shared")];

module.exports = withNativeWind(config, { input: "./global.css" });
