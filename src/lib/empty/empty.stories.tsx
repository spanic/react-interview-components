import {Meta, StoryObj} from '@storybook/react';
import Empty from './empty.component';

// 🚩Attention! Overriding displayName here is required to have proper component name in the Storybook sources panel
Empty.displayName = 'Empty';

const meta: Meta<typeof Empty> = {
  component: Empty,
  title: 'Components/Empty',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    description: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Empty>;

export const Primary: Story = {
  name: 'Default',
};
