import React, {FC, memo, useMemo} from 'react';
import {Card, Skeleton, Space, Typography} from 'antd';
import {styled} from 'styled-components';
import {isNullOrUndefined} from 'utils/object.utils';
import {withSkeleton} from 'utils/withSkeleton';
import {QuantitySelector} from './components/QuantitySelector';
import {ActionButton, ButtonType} from './components/ActionButton';

const {Paragraph, Text} = Typography;

export interface IOfferProps {
  data: {
    id?: string;
    title?: string;
    description?: string;
    price?: number;
  };
  multiple?: boolean;
  maxQty?: number;
  selectedQty?: number;
  onChangeQty?: (qty: number) => void;
}

export const Offer: FC<IOfferProps> = memo(
  ({data, multiple, maxQty, selectedQty, onChangeQty}: IOfferProps) => {
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

    return (
      <Card
        title={title || <Skeleton title paragraph={false} />}
        extra={<PriceWithSkeleton>{`${price}$ / month`}</PriceWithSkeleton>}>
        <DescriptionWithSkeleton>{description}</DescriptionWithSkeleton>
        <Space direction="vertical" align="end" style={{display: 'flex'}}>
          {multiple && selectedQty ? (
            <QuantitySelector
              qty={selectedQty}
              maxQty={maxQty!}
              onChange={qty => onChangeQty?.(qty)}
            />
          ) : (
            <ActionButton
              type={
                !multiple && selectedQty ? ButtonType.REMOVE : ButtonType.ADD
              }
              disabled={isNullOrUndefined(id) || maxQty === 0}
              onClick={() => onChangeQty?.(!multiple && selectedQty ? 0 : 1)}
            />
          )}
        </Space>
      </Card>
    );
  }
);

const Price = styled(Text)`
  margin-left: 16px;
`;

/**
 * Need to set the displayName explicitly to show it properly in the "Source" panel of Canvas
 */
// eslint-disable-next-line fp/no-mutation
Offer.displayName = 'Offer';

Offer.defaultProps = {
  multiple: false,
  maxQty: 10,
  selectedQty: 0,
  onChangeQty: undefined,
};
