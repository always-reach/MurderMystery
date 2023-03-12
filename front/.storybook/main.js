const path = require("path")

module.exports = {
  webpackFinal:async(config)=>{
    config.resolve.alias={
      ...config.resolve.alias,
      "@components":path.resolve(__dirname,"../components"),
      "@utils":path.resolve(__dirname,"../utils"),
      "@assets":path.resolve(__dirname,"../public")
    }
    return config
  },
  "stories": [
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss"
  ],
  "staticDirs":["../public"],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}