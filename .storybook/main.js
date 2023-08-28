module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.mdx',
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
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    builder: '@storybook/builder-vite',
  },

  features: {
    autoDocs: true,
  },
};
