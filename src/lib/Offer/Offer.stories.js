import {Offer} from './Offer';

const meta = {
  component: Offer,
  title: 'Example/Offer',
};

export default meta;

export const Primary = {
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
