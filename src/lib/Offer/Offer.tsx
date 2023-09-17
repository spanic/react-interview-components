import React, {FC, memo, useCallback, useMemo, useRef} from 'react';
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
  selected?: boolean;
  toggleOnly?: boolean;
  selectedQty?: number;
  onAdd?: (id: string | undefined, qty: number) => void;
  onRemove?: (id: string | undefined) => void;
}

export const Offer: FC<IOfferProps> = memo(
  ({data, selected, toggleOnly, selectedQty, onAdd, onRemove}: IOfferProps) => {
    const {id, title, description, price} = data || {};

    const manuallyEnteredQty = useRef<number | string | null>();

    const onChangeQty = useCallback(
      (qty: number | string | null) => {
        qty ? onAdd?.(id, Number(qty)) : onRemove?.(id);
      },
      [id, onAdd, onRemove]
    );

    const onChangeQtyManually = useCallback(
      (qty: number | string | null) => {
        manuallyEnteredQty.current = qty;
        if (isNullOrUndefined(qty)) {
          return;
        }
        onChangeQty(qty);
      },
      [onChangeQty]
    );

    const onInputNumberBlur = useCallback(() => {
      if (manuallyEnteredQty.current === null) {
        onChangeQty(Number(manuallyEnteredQty.current));
      }
    }, [onChangeQty]);

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
          {!toggleOnly && selectedQty ? (
            <QuantitySelector
              qty={selectedQty}
              onIncrease={() => onChangeQty(selectedQty + 1)}
              onDecrease={() => onChangeQty(selectedQty - 1)}
              onChangeManually={value => onChangeQtyManually(value)}
              onInputNumberBlur={onInputNumberBlur}
            />
          ) : (
            <ActionButton
              type={selected ? ButtonType.REMOVE : ButtonType.ADD}
              isDisabled={isNullOrUndefined(id)}
              onClick={selected ? () => onChangeQty(0) : () => onChangeQty(1)}
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
  selected: false,
  toggleOnly: false,
  selectedQty: 0,
  onAdd: undefined,
  onRemove: undefined,
};
