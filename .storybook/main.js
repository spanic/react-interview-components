import remarkGfm from 'remark-gfm';
import {mergeConfig} from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.mdx',
    '../docs/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  staticDirs: ['../public'],

  framework: {
    name: '@storybook/react-vite',
  },

  features: {
    autoDocs: false,
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [jsconfigPaths()],
    });
  },
};

export default config;
