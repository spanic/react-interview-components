/* eslint-disable fp/no-mutation */

import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';
import {Core} from 'cytoscape';
import {ConnectionsGraph, IConnectionsGraphProps} from './ConnectionsGraph';

const meta: Meta<typeof ConnectionsGraph> = {
  component: ConnectionsGraph,
  title: 'Components/ConnectionsGraph',
  decorators: [
    Story => (
      <div style={{height: '100vh'}}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    source: {
      description: 'Graph nodes and edges data',
    },
    onGraphInit: {
      description:
        'Callback fired when graph will be initialized & ready for interaction',
    },
  },
  // Manually disabling actions to avoid failure when serializing cy.Core
  parameters: {
    actions: [],
  },
};

export default meta;

const Template: StoryFn<IConnectionsGraphProps> = args => {
  const onGraphInit = (graph: Core) => {
    graph.layout({name: 'breadthfirst', fit: false}).run();
  };

  return <ConnectionsGraph {...args} onGraphInit={onGraphInit} />;
};

/**
 * Defining Stories for the ConnectionsGraph component
 */

export const Default = Template.bind({});
Default.args = {
  source: [
    {
      data: {
        id: 'A',
      },
    },
    {
      data: {
        id: 'B',
      },
    },
    {
      data: {
        id: 'C',
      },
    },
    {
      data: {
        id: 'D',
      },
    },
    {
      data: {
        id: 'E',
      },
    },
    {
      data: {
        id: 'A_B_1',
        source: 'A',
        target: 'B',
        color: '#FF36AB',
        name: 'A ➡️ B',
      },
    },
    {
      data: {
        id: 'B_C_1',
        source: 'B',
        target: 'C',
        color: '#FF36AB',
        name: 'B ➡️ C',
      },
    },
    {
      data: {
        id: 'B_C_2',
        source: 'B',
        target: 'C',
        name: 'B ➡️ C (alt.)',
      },
    },
    {
      data: {
        id: 'D_E_1',
        source: 'D',
        target: 'E',
        color: '#F7B32B',
        name: 'D ➡️ E',
      },
    },
    {
      data: {
        id: 'E_A_1',
        source: 'E',
        target: 'A',
        color: '#F7B32B',
        name: 'E ➡️ A',
      },
    },
    {
      data: {
        id: 'D_E_2',
        source: 'D',
        target: 'E',
        name: 'D ➡️ E (alt.)',
      },
    },
    {
      data: {
        id: 'E_A_2',
        source: 'E',
        target: 'A',
        name: 'E ➡️ A (alt.)',
      },
    },
  ],
};
