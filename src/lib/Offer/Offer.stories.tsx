/* eslint-disable fp/no-mutation */

import React from 'react';
import {Col, Row} from 'antd';
import type {Meta, StoryFn} from '@storybook/react';
import {Offer, IOfferProps} from './Offer';

const meta: Meta<typeof Offer> = {
  component: Offer,
  title: 'Components/Offer',
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
      description: `Flag that marks Offer as selected<br />
        ❗️ Works only if \`multiple == false\``,
    },
    multiple: {
      description:
        'Controls whether Offer could be added only once, or adding multiple instances is allowed',
    },
    maxQty: {
      description: `Maximum number of Offer instances that user can add<br />
      ❗️ Works only if \`multiple == true\``,
    },
    selectedQty: {
      description: `Number of Offer instances that has already been added<br />
        ❗️ Works only if \`multiple == true\``,
    },
    onChangeQty: {
      description: `Callback function invoked when changes selected amount of Offer instances`,
    },
  },
};

export default meta;

/**
 * Defining Stories for the Order component
 */

export {Default} from './stories/Default.story';

export {Multiple} from './stories/Multiple.story';

const Template: StoryFn<IOfferProps> = args => <Offer {...args} />;
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
