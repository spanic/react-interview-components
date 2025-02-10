import {createStyles} from 'antd-style';
import React, {ComponentProps, FC, memo, ReactNode} from 'react';
import {Empty} from 'antd';
import emptyPlaceholder from './assets/empty.svg';

export interface EmptyProps extends ComponentProps<typeof Empty> {
  description?: ReactNode;
}

const useStyles = createStyles(() => ({
  empty: {
    maxWidth: 280,
    width: '80%',

    '.ant-empty-image': {
      height: 'auto',

      '& img': {
        width: '100%',
      },
    },
  },
}));

const EmptyComponent: FC<EmptyProps> = ({description, ...props}) => {
  const {styles} = useStyles();

  return (
    <Empty
      className={styles.empty}
      image={emptyPlaceholder}
      description={description}
      {...props}
    />
  );
};

EmptyComponent.defaultProps = {
  description: "Schrödinger's cat is in another box",
};
EmptyComponent.displayName = 'EmptyComponent';

export default memo(EmptyComponent) as typeof EmptyComponent;
