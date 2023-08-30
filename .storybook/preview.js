/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
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
          'Example',
        ],
      },
    },
  },
};

export default preview;
