/* eslint-disable fp/no-mutation */

import React from 'react';
import {useArgs, useCallback, useEffect, useRef} from '@storybook/preview-api';
import type {StoryFn} from '@storybook/react';
import {IOfferProps, Offer} from '../Offer';
import OfferDefaultData from './offer-default-data';

const Template: StoryFn<IOfferProps> = args => {
  const [{selected}, updateArgs] = useArgs();

  const isSelected = useRef<boolean>(selected);

  useEffect(() => {
    updateArgs({selected: !!selected});
  }, []);

  useEffect(() => {
    if (selected !== isSelected.current) {
      isSelected.current = selected;
      updateArgs({selected});
    }
  }, [selected]);

  const onToggle = useCallback((value: boolean) => {
    updateArgs({selected: value});
  }, []);

  return (
    <Offer
      onAdd={() => onToggle(true)}
      onRemove={() => onToggle(false)}
      selected={isSelected.current}
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
  controls: {exclude: ['toggleOnly', 'selectedQty', 'onAdd', 'onRemove']},
};
