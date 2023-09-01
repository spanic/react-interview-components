import React from 'react';
import {Layout, Statistic} from 'antd';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

const {Footer: AntdFooter} = Layout;

const Total = () => {
  const total = useSelector(state => state.total.totalPrice);

  return (
    <Footer>
      <div>
        Total:
        <Statistic value={total} suffix="$ per month" />
      </div>
    </Footer>
  );
};

const Footer = styled(AntdFooter)`
  background-color: #003eb3;

  &,
  & .ant-statistic-content {
    color: white;
  }
`;

export {Total};
