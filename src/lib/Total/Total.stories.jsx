import React, {useState} from 'react';
import {store} from 'lib/store';
import {Provider, useDispatch} from 'react-redux';
import {Button, InputNumber, Space, Typography} from 'antd';
import {Total} from './Total';
import {setTotalPrice} from './Total.slice';

export default {
  component: Total,
  title: 'Example/Total',
  decorators: [story => <Provider store={store}>{story()}</Provider>],
  argTypes: {},
};

// eslint-disable-next-line react/prop-types
const TotalWrapper = ({children}) => {
  const dispatch = useDispatch();
  const [priceValue, setPriceValue] = useState(50);

  const {Title} = Typography;

  const updatePriceFn = () => dispatch(setTotalPrice(priceValue));

  return (
    <>
      {children}
      <Title level={4}>Controls</Title>
      <Space wrap>
        <InputNumber
          min={0}
          max={999}
          defaultValue={priceValue}
          onChange={setPriceValue}
          onPressEnter={updatePriceFn}
        />
        <Button type="primary" onClick={updatePriceFn}>
          Change price
        </Button>
      </Space>
    </>
  );
};

export const Default = {
  render: args => (
    <TotalWrapper>
      <Total {...args} />
    </TotalWrapper>
  ),
};
