module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          blacklist: null, // DEPRECATED
          whitelist: null, // DEPRECATED
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@styles": "./src/styles",
            "@api": "./src/api",
            "@context": "./src/context",
            "@redux": "./src/redux",
          },
          extensions: [".svg", ".js", ".ts", ".tsx", ".json"],
        },
      ],

      "react-native-reanimated/plugin",
    ],
  };
};
