/* eslint-disable fp/no-mutation */

import React from 'react';
import {useArgs, useCallback, useEffect, useRef} from '@storybook/preview-api';
import type {StoryFn} from '@storybook/react';
import {isNullOrUndefined} from 'utils/object.utils';
import {IOfferProps, Offer} from '../Offer';
import OfferDefaultData from './offer-default-data';

const Template: StoryFn<IOfferProps> = args => {
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

export const Multiple = Template.bind({});

Multiple.args = {
  data: OfferDefaultData,
  multiple: true,
};

Multiple.parameters = {
  actions: [],
  controls: {exclude: ['multiple', 'selected', 'onChangeQty']},
};
