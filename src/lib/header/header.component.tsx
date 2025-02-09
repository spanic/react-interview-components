import React, {FC, memo} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Flex, Input, Layout, theme} from 'antd';
import {createStyles} from 'antd-style';

import logo from './assets/company-logo.svg';
import mobileLogo from './assets/company-logo_small.svg';

const {Header} = Layout;
const {useToken} = theme;

export interface HeaderProps {
  onChange?: (value: string) => void;
  className?: string;
}

const useStyles = createStyles(({token, responsive}) => ({
  header: {
    display: 'flex',
    padding: `0 ${token.paddingLG}px`,
  },
  logo: {
    display: 'flex',
    flex: '0 0 160px',

    [responsive.tablet]: {
      flexBasis: 39,
    },
  },
  search: {
    maxWidth: 510,
  },
}));

const HeaderComponent: FC<HeaderProps> = ({onChange, className}) => {
  const {styles, cx} = useStyles();
  const {token} = useToken();

  return (
    <Header className={cx(className, styles.header)}>
      <Flex align="center" justify="space-between" flex="1 100%" gap="middle">
        <picture className={styles.logo}>
          <source media={`(min-width: ${token.screenMDMin}px)`} srcSet={logo} />
          <img src={mobileLogo} alt="ACME Corp. company logo" />
        </picture>
        <Input
          className={styles.search}
          prefix={<SearchOutlined />}
          allowClear
          onChange={e => onChange?.(e.target.value)}
        />
      </Flex>
    </Header>
  );
};

HeaderComponent.defaultProps = {
  onChange: undefined,
  className: undefined,
};

// 🚩 Attention! Setting displayName manually is a workaround that forces proper type inference for Storybook Controls & Args blocks
HeaderComponent.displayName = 'HeaderComponent';

export default memo(HeaderComponent) as typeof HeaderComponent;
