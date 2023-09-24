/* eslint-disable fp/no-mutation */

import React from 'react';
import type {StoryFn} from '@storybook/react';
import Default, {Template as DefaultTemplate} from './Default.story';
import {IOfferProps} from '../Offer';

export const Multiple: StoryFn<IOfferProps> = DefaultTemplate;

Multiple.args = {
  data: Default.args?.data,
  multiple: true,
};

Multiple.parameters = {
  actions: [],
  controls: {exclude: ['multiple', 'selected', 'onChangeQty']},
};
