import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, InputNumber as AndtInputNumber, Space} from 'antd';
import React, {FC, useCallback, useRef} from 'react';
import {styled} from 'styled-components';
import {isNullOrUndefined} from 'utils/object.utils';
import {ResetButton} from './ResetButton';

export interface IQuantitySelectorProps {
  qty: number;
  maxQty: number;
  onChange: (value: number) => void;
}

export const QuantitySelector: FC<IQuantitySelectorProps> = ({
  qty,
  maxQty,
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
    <Container>
      <ResetButton onConfirm={() => onChange(0)} currentValue={qty} />
      <Space.Compact>
        <Button
          icon={<MinusOutlined />}
          onClick={() => onChange(qty - 1)}
          disabled={qty === 0}
        />
        <InputNumber
          value={qty}
          min={0}
          max={maxQty}
          controls={false}
          onChange={onChangeManually}
          onBlur={onInputNumberBlur}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={() => onChange(qty + 1)}
          disabled={qty >= maxQty}
        />
      </Space.Compact>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    flex-shrink: 0;
  }
`;

const InputNumber = styled(AndtInputNumber)`
  &.ant-input-number-compact-item {
    width: 4rem;

    &:focus-within {
      z-index: 2;
    }

    .ant-input-number-input {
      text-align: center;
    }
  }
`;
