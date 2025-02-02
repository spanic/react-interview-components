import remarkGfm from 'remark-gfm';
import {mergeConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
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

  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },

  staticDirs: ['../public/assets'],

  framework: {
    name: '@storybook/react-vite',
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  features: {
    autoDocs: true,
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths(), svgr()],
      publicDir: false,
    });
  },
};

export default config;
