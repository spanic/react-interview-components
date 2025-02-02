import {Meta, StoryObj} from '@storybook/react';
import Total from './total.component';

const meta: Meta<typeof Total> = {
  component: Total,
  title: 'Components/Total',
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Total price',
      control: {
        type: 'number',
        min: 0,
      },
    },
  },
  parameters: {
    controls: {exclude: ['className']},
  },
};

export default meta;

type Story = StoryObj<typeof Total>;

export const Default: Story = {
  args: {
    value: 17,
  },
};
