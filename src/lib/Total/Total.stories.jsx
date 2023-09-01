import {Total} from './Total';

export default {
  component: Total,
  title: 'Components/Total',
  argTypes: {
    value: {
      description: 'Price to be displayed',
    },
  },
};

export const Default = {
  args: {
    value: 17,
  },
};
