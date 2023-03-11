const path = require("path")

module.exports = {
  webpackFinal:async(config)=>{
    config.resolve.alias={
      ...config.resolve.alias,
      "@components":path.resolve(__dirname,"../components")
    }
    return config
  },
  "stories": [
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}