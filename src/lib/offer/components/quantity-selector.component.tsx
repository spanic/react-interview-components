import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, InputNumber as AntdInputNumber, Space} from 'antd';
import React, {FC, useCallback, useRef} from 'react';
import {styled} from 'styled-components';
import {isNullOrUndefined} from 'utils/object.utils';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import useCompactMode from '../hooks/use-compact-mode.hook';
import {ResetButton} from './reset-button.component';

const MIN_WIDTH_PX = 260;

export interface IQuantitySelectorProps {
  qty: number;
  maxQty: number;
  onChange: (value: number) => void;
  size?: SizeType;
}

export const QuantitySelector: FC<IQuantitySelectorProps> = ({
  qty,
  maxQty,
  onChange,
  size,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <Container ref={containerRef}>
      <ResetButton
        size={size}
        iconOnly={useCompactMode(containerRef, MIN_WIDTH_PX)}
        onConfirm={() => onChange(0)}
        currentValue={qty}
      />

      <Space.Compact>
        <Button
          size={size}
          icon={<MinusOutlined />}
          onClick={() => onChange(qty - 1)}
          disabled={qty === 0}
        />
        <InputNumber
          value={qty}
          min={0}
          max={maxQty}
          controls={false}
          size={size}
          onChange={onChangeManually}
          onBlur={onInputNumberBlur}
        />
        <Button
          size={size}
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

const InputNumber = styled(AntdInputNumber)`
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

QuantitySelector.defaultProps = {
  size: 'middle',
};
