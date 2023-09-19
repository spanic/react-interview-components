/* eslint-disable fp/no-mutation */

import React from 'react';
import Default, {Template as DefaultTemplate} from './Default.story';

export const Multiple = DefaultTemplate;

Multiple.args = {
  data: Default.args?.data,
  multiple: true,
};

Multiple.parameters = {
  actions: [],
  controls: {exclude: ['multiple', 'selected', 'onChangeQty']},
};
