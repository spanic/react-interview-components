import '../src/styles/storybook-global.scss';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      showPanel: true,
      isToolshown: true,
      storySort: {
        order: [
          'Docs',
          [
            'Intro',
            'Install',
            'Develop',
            'Publish',
            'Linters',
            'Testing',
            'Style options',
            'Add documentation',
          ],
          'Components',
        ],
      },
    },
  },
};

export default preview;
