import React from 'react';
import {Layout, Statistic} from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const {Footer: AntdFooter} = Layout;

export const Total = ({value = 0, className}) => (
  <Footer className={className}>
    <div>
      Total:
      <Statistic value={value} suffix="$ per month" />
    </div>
  </Footer>
);

const Footer = styled(AntdFooter)`
  &.ant-layout-footer {
    background-color: #003eb3;

    &,
    .ant-statistic-content {
      color: white;
    }

    .ant-statistic-content-suffix {
      margin-inline-start: 0;
    }
  }
`;

Total.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
};

Total.defaultProps = {
  value: 0,
  className: undefined,
};
