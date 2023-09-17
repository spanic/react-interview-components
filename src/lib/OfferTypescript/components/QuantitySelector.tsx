import React, {FC} from 'react';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, InputNumber as AndtInputNumber, Space} from 'antd';
import {styled} from 'styled-components';

export interface IQuantitySelectorProps {
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChangeManually: (value: number | string | null) => void;
  onInputNumberBlur: () => void;
}

export const QuantitySelector: FC<IQuantitySelectorProps> = ({
  qty,
  onIncrease,
  onDecrease,
  onChangeManually,
  onInputNumberBlur,
}) => (
  <Space.Compact>
    <Button
      icon={<MinusOutlined />}
      onClick={onDecrease}
      disabled={qty === 0}
    />
    <InputNumber
      value={qty}
      min={0}
      max={10}
      controls={false}
      onChange={onChangeManually}
      onBlur={onInputNumberBlur}
    />
    <Button
      icon={<PlusOutlined />}
      onClick={onIncrease}
      disabled={qty === 10 /* TODO: remove hardcoded value */}
    />
  </Space.Compact>
);

const InputNumber = styled(AndtInputNumber)`
  &.ant-input-number-compact-item {
    &:focus-within {
      z-index: 2;
    }
  }
`;
