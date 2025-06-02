import React from 'react';
import type {Meta, StoryFn, StoryObj} from '@storybook/react';
import { theme } from 'antd';
import { ResponsivePreviewDecorator } from '../../../decorators/ResponsivePreviewDecorator';
import { getDynamicDimensions, SingleDimension } from '../../../utils/dimensions';
import {useArgs, useCallback, useEffect, useRef} from '@storybook/preview-api';
import {action} from '@storybook/addon-actions';
import Offer, {IOfferProps} from './offer.component';
import {isNullOrUndefined} from '../../utils/object.utils';

Offer.displayName = 'Offer';

const meta: Meta<typeof Offer> = {
  component: Offer,
  title: 'Components/Offer',
  decorators: [
    (Story, context) => {
      const currentToken = theme.getDesignToken(); // Gets the default Ant Design tokens
      const allDimensions = getDynamicDimensions(currentToken);

      // Directly define the array for display and for the check
      const dimensionsForPreview: SingleDimension[] = [
        allDimensions.XS,
        allDimensions.MD,
        allDimensions.LG,
      ];

      // Check if all selected dimensions are valid (primarily checks if XS, MD, LG keys existed in allDimensions)
      if (!dimensionsForPreview[0] || !dimensionsForPreview[1] || !dimensionsForPreview[2]) {
        console.error(
          'Error resolving one or more dynamic dimensions (XS, MD, LG) for Storybook decorator. Rendering story without decorator.',
          allDimensions,
        );
        return <Story />;
      }
      
      return (
        <ResponsivePreviewDecorator displayDimensions={dimensionsForPreview}>
          <Story />
        </ResponsivePreviewDecorator>
      );
    },
  ],
  argTypes: {
    data: {
      description: 'Offer data',
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
  args: {
    data: {
      id: '1',
      imageUrl: new URL('./assets/offer-image.png', import.meta.url).href,
      title: 'Modern Chair',
      description:
        'This modern chair features a sleek design with a black seat and backrest. It has a unique contoured shape that provides both style and comfort. The chair is supported by a light wooden base that adds to its contemporary appeal.',
      price: 299.99,
    },
  },
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
  args: {
    data: {
      id: '2',
      title: "Women's Athletic Leggings",
      description:
        'These black athletic leggings are designed for comfort and performance during workouts or casual wear. They feature a mesh panel on the back of each leg for ventilation and breathability. The elastic waistband ensures a comfortable fit while the moisture-wicking fabric helps keep you dry during your activities.',
      imageUrl: new URL('./assets/offer-image-2.jpg', import.meta.url).href,
      price: 23.5,
    },
    maxQty: 10,
    selectedQty: 3,
  },
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
