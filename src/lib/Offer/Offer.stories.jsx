import React from 'react';
import {Col, Row} from 'antd';
import {Offer} from './Offer';

const meta = {
  component: Offer,
  title: 'Example/Offer',
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
    onSelect: {
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

export const Default = {
  args: {
    data: {
      id: 'amazon_prime',
      title: 'Amazon Prime',
      description:
        'Enjoy unlimited delivery, award-winning video, ad-free music and more',
      price: 9.99,
    },
  },
};

export const Selected = {
  args: {
    data: {
      ...Default.args.data,
      selected: true,
    },
  },
};

export const NoData = {
  argTypes: {
    data: {
      control: false,
    },
  },
};
