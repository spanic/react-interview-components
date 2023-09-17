import React, {FC, useCallback, useRef} from 'react';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, InputNumber as AndtInputNumber, Space} from 'antd';
import {styled} from 'styled-components';
import {isNullOrUndefined} from 'utils/object.utils';

export interface IQuantitySelectorProps {
  qty: number;
  onChange: (value: number) => void;
}

export const QuantitySelector: FC<IQuantitySelectorProps> = ({
  qty,
  onChange,
}) => {
  const manuallyEnteredQty = useRef<number | string | null>();

  const onChangeManually = useCallback(
    (value: number | string | null) => {
      manuallyEnteredQty.current = value;
      if (isNullOrUndefined(value)) {
        return;
      }
      onChange(Number(value));
    },
    [onChange]
  );

  const onInputNumberBlur = useCallback(() => {
    if (manuallyEnteredQty.current === null) {
      onChange(Number(manuallyEnteredQty.current));
    }
  }, [onChange]);

  return (
    <Space.Compact>
      <Button
        icon={<MinusOutlined />}
        onClick={() => onChange(qty - 1)}
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
        onClick={() => onChange(qty + 1)}
        disabled={qty === 10 /* TODO: remove hardcoded value */}
      />
    </Space.Compact>
  );
};

const InputNumber = styled(AndtInputNumber)`
  &.ant-input-number-compact-item {
    &:focus-within {
      z-index: 2;
    }
  }
`;
