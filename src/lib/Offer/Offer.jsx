import React, {memo, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Skeleton, Space, Typography} from 'antd';
import {styled} from 'styled-components';
import {isNullOrUndefined} from 'utils/object.utils';
import {withSkeleton} from 'utils/withSkeleton';

const {Paragraph, Text} = Typography;

export const Offer = memo(({data, selected, onSelect, onRemove}) => {
  const {id, title, description, price} = data || {};

  const DescriptionWithSkeleton = useMemo(
    () =>
      withSkeleton(Paragraph, isNullOrUndefined(description), {
        title: false,
        paragraph: {rows: 3},
      }),
    [description]
  );

  const PriceWithSkeleton = useMemo(
    () =>
      withSkeleton(Price, isNullOrUndefined(price), {
        title: false,
        paragraph: {rows: 1, width: 100},
        style: {marginLeft: 20},
      }),
    [price]
  );

  const ActionButton = useCallback(() => {
    const props = {
      shape: 'round',
      icon: selected ? <MinusOutlined /> : <PlusOutlined />,
      onClick: selected ? () => onRemove?.(id) : () => onSelect?.(id),
      children: selected ? 'Remove' : 'Add',
      disabled: isNullOrUndefined(id),
      ...(selected ? null : {type: 'primary'}),
      ...(selected && {danger: true}),
    };
    return <Button {...props} />;
  }, [selected, id, onRemove, onSelect]);

  return (
    <Card
      title={title || <Skeleton title paragraph={false} />}
      extra={<PriceWithSkeleton>{`${price}$ / month`}</PriceWithSkeleton>}>
      <DescriptionWithSkeleton>{description}</DescriptionWithSkeleton>
      <Space direction="vertical" align="end" style={{display: 'flex'}}>
        <ActionButton />
      </Space>
    </Card>
  );
});

const Price = styled(Text)`
  margin-left: 16px;
`;

/**
 * Need to set the displayName explicitly to show it properly in the "Source" panel of Canvas
 */
// eslint-disable-next-line fp/no-mutation
Offer.displayName = 'Offer';

Offer.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
};

Offer.defaultProps = {
  selected: false,
  onSelect: undefined,
  onRemove: undefined,
};
