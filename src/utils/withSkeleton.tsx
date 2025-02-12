import React, {ComponentProps, ElementType} from 'react';
import {Skeleton} from 'antd';

export const withSkeleton = <T extends ElementType>(
  Component: T,
  condition: boolean,
  skeletonProps: ComponentProps<typeof Skeleton>
) => {
  return (props: ComponentProps<T>) =>
    condition ? <Skeleton {...skeletonProps} /> : <Component {...props} />;
};
