import React from 'react';
import {Offer} from 'lib';
import classes from './App.module.css';

export const App = () => (
  <div className={classes.container}>
    <Offer
      data={{
        id: 'amazon_prime',
        title: 'Amazon Prime',
        description:
          'Enjoy unlimited delivery, award-winning video, ad-free music and more',
        price: 9.99,
      }}
    />
  </div>
);
