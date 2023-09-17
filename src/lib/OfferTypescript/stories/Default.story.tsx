/* eslint-disable fp/no-mutation */

import React from 'react';
import {useArgs, useCallback, useEffect, useRef} from '@storybook/preview-api';
import type {StoryFn} from '@storybook/react';
import {isNullOrUndefined} from 'utils/object.utils';
import {IOfferProps, OfferTypescript} from '../OfferTypescript';
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

  const onChangeQty = useCallback((id: string | undefined, qty?: number) => {
    updateArgs({selectedQty: isNullOrUndefined(qty) ? 0 : qty});
  }, []);

  return (
    <OfferTypescript
      onAdd={onChangeQty}
      onRemove={onChangeQty}
      selectedQty={quantity.current}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  data: OfferDefaultData,
};
Default.parameters = {
  actions: [],
  controls: {exclude: ['selected', 'toggleOnly', 'onAdd', 'onRemove']},
};
Default.argTypes = {
  selectedQty: {control: {type: 'number', min: 0, max: 10}},
};
