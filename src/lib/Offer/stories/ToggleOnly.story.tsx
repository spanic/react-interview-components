/* eslint-disable fp/no-mutation */

import React from 'react';
import {useArgs, useCallback, useEffect, useRef} from '@storybook/preview-api';
import type {StoryFn} from '@storybook/react';
import {IOfferProps, Offer} from '../Offer';
import OfferDefaultData from './offer-default-data';

const Template: StoryFn<IOfferProps> = args => {
  const [{selected}, updateArgs] = useArgs();

  const selectedRef = useRef<boolean>(selected);

  useEffect(() => {
    updateArgs({selected: !!selected});
  }, []);

  useEffect(() => {
    if (selected !== selectedRef.current) {
      selectedRef.current = selected;
      updateArgs({selected});
    }
  }, [selected]);

  const onToggle = useCallback((isSelected: boolean) => {
    updateArgs({selected: isSelected});
  }, []);

  return (
    <Offer
      onChangeQty={value => onToggle(!!value)}
      selected={selectedRef.current}
      {...args}
    />
  );
};

export const ToggleOnly = Template.bind({});

ToggleOnly.args = {
  data: OfferDefaultData,
  toggleOnly: true,
};

ToggleOnly.parameters = {
  actions: [],
  controls: {exclude: ['toggleOnly', 'maxQty', 'selectedQty', 'onChangeQty']},
};
