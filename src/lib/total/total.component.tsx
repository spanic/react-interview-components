import React, {FC, memo} from 'react';
import {Layout, Statistic, theme, Typography} from 'antd';
import {createStyles} from 'antd-style';

const {Footer} = Layout;
const {Text} = Typography;
const {useToken} = theme;

export interface TotalProps {
  value?: number;
  className?: string;
}

const useStyles = createStyles(({token}) => ({
  wrapper: {
    backgroundColor: token.colorPrimaryActive,
    color: token.colorWhite,
  },
  label: {
    color: token.colorWhite,
  },
}));

const Total: FC<TotalProps> = ({value = 0, className}) => {
  const {styles, cx} = useStyles();
  const {token} = useToken();

  return (
    <Footer className={cx(className, styles.wrapper)}>
      <div>
        <Text className={styles.label}>Total:</Text>
        <Statistic
          value={value}
          valueStyle={{color: token.colorWhite}}
          suffix="$"
        />
      </div>
    </Footer>
  );
};

Total.defaultProps = {
  value: 0,
  className: undefined,
};

// 🚩 Attention! Setting displayName manually is a workaround that forces proper type inference for Storybook Controls & Args blocks
// eslint-disable-next-line fp/no-mutation
Total.displayName = 'Total';

export default memo(Total) as typeof Total;
