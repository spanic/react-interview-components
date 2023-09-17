/* eslint-disable fp/no-mutation */

import React from 'react';
import {Col, Row} from 'antd';
import type {Meta, StoryFn} from '@storybook/react';
import {OfferTypescript, IOfferProps} from './OfferTypescript';

const meta: Meta<typeof OfferTypescript> = {
  component: OfferTypescript,
  title: 'Components/OfferTypescript',
  decorators: [
    Story => (
      <Row>
        <Col xs={24} md={12} lg={8}>
          <Story />
        </Col>
      </Row>
    ),
  ],
  argTypes: {
    data: {
      description: 'Offer data',
    },
    selected: {
      description: 'Flag that marks Offer as selected',
    },
    onAdd: {
      description:
        'Callback function invoked when user clicks on "➕ Add" button, passes chosen Offer\'s `id`',
    },
    onRemove: {
      description:
        'Callback function invoked when user clicks on "➖ Remove" button, passes removed Offer\'s `id`',
    },
  },
};

export default meta;

/**
 * Defining Stories for the Order component
 */

export {Default} from './stories/Default.story';

export {ToggleOnly} from './stories/ToggleOnly.story';

const Template: StoryFn<IOfferProps> = args => <OfferTypescript {...args} />;
export const NoData = Template.bind({});
NoData.parameters = {
  options: {showPanel: false},
  controls: {exclude: /^.*/},
};

/**
 * We can also set argTypes per story!
 *
 * NoData.argTypes = {
 *   selected: {
 *     control: false,
 *   },
 * },
 *
 */
