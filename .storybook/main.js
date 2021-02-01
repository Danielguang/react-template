const path = require("path");
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "storybook-addon-react-docgen"
  ],
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\.tsx?$/,
  //     include: path.resolve(__dirname, "../src"),
  //     use: [
  //       require.resolve("ts-loader"),
  //       {
  //         loader: require.resolve("react-docgen-typescript-loader"),
  //         options: {
  //           // Provide the path to your tsconfig.json so that your stories can
  //           // display types from outside each individual story.
  //           tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
  //         },
  //       },
  //     ],

  //   })
  //   config.resolve.extensions.push(".ts", ".tsx");
  //   return config;
  // }
}