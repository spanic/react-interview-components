/* eslint-disable fp/no-mutation */

import React from 'react';
import {useArgs, useCallback, useEffect, useRef} from '@storybook/preview-api';
import type {StoryFn} from '@storybook/react';
import {isNullOrUndefined} from 'utils/object.utils';
import {IOfferProps, Offer} from '../Offer';
import OfferDefaultData from './offer-default-data';

export const Template: StoryFn<IOfferProps> = args => {
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
  }, []);

  return (
    <Offer onChangeQty={onChangeQty} selectedQty={quantity.current} {...args} />
  );
};

const Default = Template.bind({});
Default.args = {
  data: OfferDefaultData,
};
Default.parameters = {
  actions: [],
  controls: {
    exclude: ['multiple', 'maxQty', 'onChangeQty'],
  },
};
Default.argTypes = {
  selectedQty: {control: {type: 'number', min: 0, max: 1}},
};

export default Default;
