import {Total} from './Total';

export default {
  component: Total,
  title: 'Components/Total',
  argTypes: {
    value: {
      description: 'Price to be displayed',
    },
    className: {if: {truthy: false}},
  },
};

export const Default = {
  args: {
    value: 17,
  },
  parameters: {
    controls: {exclude: ['className']},
  },
};
