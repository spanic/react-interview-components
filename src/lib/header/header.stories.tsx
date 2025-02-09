import {Meta, StoryObj} from '@storybook/react';
import Header from './header.component';

// 🚩Attention! Overriding displayName here is required to have proper component name in the Storybook sources panel
Header.displayName = 'Header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Components/Header',
  tags: ['autodocs'],
  argTypes: {
    onChange: {
      action: 'onChange',
      description: 'Executed upon value changes',
    },
  },
  parameters: {
    controls: {exclude: ['className']},
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  name: 'Default',
};
