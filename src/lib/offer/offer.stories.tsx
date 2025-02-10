import React from 'react';
import {Col, Row} from 'antd';
import type {Meta, StoryFn, StoryObj} from '@storybook/react';
import {useArgs, useCallback, useEffect, useRef} from '@storybook/preview-api';
import Offer, {IOfferProps} from './offer.component';
import {isNullOrUndefined} from '../../utils/object.utils';
import offerData from './offer.data';
import {action} from '@storybook/addon-actions';

Offer.displayName = 'Offer';

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
    multiple: {
      description: "Controls whether user can add 2+ Offer's instances or not",
    },
    maxQty: {
      description:
        "Maximum number of Offer's instances that user can add. Works only when `multiple == true`",
    },
    selectedQty: {
      description:
        "Number of current Offer's instances that has already been added",
    },
    onChangeQty: {
      description: `Callback function invoked when selected amount of Offer's instances changes`,
    },
  },
};

export default meta;

const OfferRenderFn: StoryFn<IOfferProps> = args => {
  const [{selectedQty}, updateArgs] = useArgs();

  const quantity = useRef<number>(0);

  useEffect(() => {
    const selectedQtyValue = isNullOrUndefined(selectedQty) ? 0 : selectedQty;
    updateArgs({selectedQty: selectedQtyValue});
  }, []);

  useEffect(() => {
    if (isNullOrUndefined(selectedQty)) {
      return;
    }
    if (selectedQty !== quantity.current) {
      quantity.current = selectedQty;
      updateArgs({selectedQty});
    }
  }, [selectedQty]);

  const onChangeQty = useCallback((qty: number) => {
    updateArgs({selectedQty: qty});
    action('onChangeQty')(qty);
  }, []);

  return (
    <Offer onChangeQty={onChangeQty} selectedQty={quantity.current} {...args} />
  );
};

export const Default: StoryObj<typeof Offer> = {
  args: {data: offerData},
  render: OfferRenderFn,
  argTypes: {
    selectedQty: {control: {type: 'number', min: 0, max: 1}},
  },
  parameters: {
    actions: [],
    controls: {
      exclude: ['multiple', 'maxQty', 'onChangeQty'],
    },
  },
};

export const Multiple: StoryObj<typeof Offer> = {
  args: {data: offerData, multiple: true, selectedQty: 3},
  render: OfferRenderFn,
  argTypes: {
    selectedQty: {control: {type: 'number', min: 0}},
  },
  parameters: {
    actions: [],
    controls: {exclude: ['multiple', 'onChangeQty']},
  },
};

export const NoData: StoryObj<typeof Offer> = {
  render: OfferRenderFn,
  parameters: {
    options: {showPanel: false},
    controls: {exclude: /^.*/},
  },
};
