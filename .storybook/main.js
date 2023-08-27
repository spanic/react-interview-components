module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../docs/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-mdx-gfm',
  ],

  staticDirs: ['../public'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  features: {
    autoDocs: false,
  },
};
