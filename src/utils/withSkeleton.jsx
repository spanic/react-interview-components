import React from 'react';
import {Skeleton} from 'antd';

export const withSkeleton = (Component, condition, _skeleton) => {
  const WithSkeleton = props =>
    condition ? <Skeleton {..._skeleton} /> : <Component {...props} />;
  return WithSkeleton;
};
