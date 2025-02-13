import React, {FC} from 'react';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, ButtonProps} from 'antd';

export enum ActionType {
  ADD,
  REMOVE,
}

export interface IActionButtonProps extends ButtonProps {
  actionType: ActionType;
}

export const ActionButton: FC<IActionButtonProps> = ({
  actionType,
  ...buttonProps
}) => {
  const props: ButtonProps = {
    icon: actionType === ActionType.ADD ? <PlusOutlined /> : <DeleteOutlined />,
    children: actionType === ActionType.ADD ? 'Add' : 'Remove',
    ...(actionType === ActionType.REMOVE && {danger: true}),
  };
  return <Button {...props} {...buttonProps} />;
};
