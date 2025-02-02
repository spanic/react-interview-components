import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {CloseOutlined, UndoOutlined} from '@ant-design/icons';
import {Button as AntdButton} from 'antd';
import {isNullOrUndefined} from 'utils/object.utils';

const ANIMATION_LENGTH_MS = 500;
const ICON_CHANGE_TIMEOUT_MS = 200;

export interface IResetButtonProps {
  iconOnly?: boolean;
  currentValue?: any;
  onConfirm?: () => void;
}

const ResetButton = forwardRef<HTMLButtonElement, IResetButtonProps>(
  (
    {iconOnly, currentValue, onConfirm},
    ref /* I don't need this ref for now, but let it be */
  ) => {
    const isPristine = useRef<boolean>(true);

    const [awaitingConfirmation, setAwaitingConfirmation] =
      useState<boolean>(false);

    const [icon, setIcon] = useState<JSX.Element>(<UndoOutlined />);

    useEffect(() => {
      if (awaitingConfirmation) {
        setAwaitingConfirmation(false);
      }
    }, [currentValue]);

    useEffect(() => {
      if (isPristine.current) {
        return undefined;
      }
      const timer = setTimeout(() => {
        setIcon(awaitingConfirmation ? <CloseOutlined /> : <UndoOutlined />);
      }, ICON_CHANGE_TIMEOUT_MS);
      return () => {
        clearTimeout(timer);
      };
    }, [awaitingConfirmation]);

    const handleClick = useCallback(() => {
      if (awaitingConfirmation) {
        onConfirm?.();
      } else {
        setAwaitingConfirmation(true);
      }
      isPristine.current = false;
    }, [awaitingConfirmation, onConfirm]);

    return !isNullOrUndefined(iconOnly) ? (
      <Button
        icon={icon}
        onClick={handleClick}
        type={awaitingConfirmation ? 'primary' : 'default'}
        danger
        {...(isPristine.current
          ? null
          : {$awaitingConfirmation: awaitingConfirmation})}
        ref={ref}>
        {!iconOnly && 'Reset'}
      </Button>
    ) : null;
  }
);

const rotate = keyframes`
  to {
    transform: rotate(-360deg);
  }
`;

const rotateBackwards = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Button = styled(AntdButton)<{$awaitingConfirmation?: boolean}>`
  & .ant-btn-icon {
    ${props =>
      props.$awaitingConfirmation !== undefined &&
      css`
        animation: ${props.$awaitingConfirmation ? rotate : rotateBackwards}
          ${ANIMATION_LENGTH_MS}ms ease-in-out running;
      `};
  }
`;

ResetButton.defaultProps = {
  iconOnly: false,
  currentValue: undefined,
  onConfirm: undefined,
};

export {ResetButton};
