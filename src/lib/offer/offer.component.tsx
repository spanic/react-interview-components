import React, {FC, memo} from 'react';
import {Card, Divider, Typography} from 'antd';
import {isNullOrUndefined} from 'utils/object.utils';
import {withSkeleton} from 'utils/withSkeleton';
import {createStyles} from 'antd-style';
import {TagOutlined} from '@ant-design/icons';
import {QuantitySelector} from './components/quantity-selector.component';
import {ActionButton, ButtonType} from './components/action-button.component';

const {Paragraph: AntdParagraph, Text: AntdText, Title: AntdTitle} = Typography;

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

const useStyles = createStyles(({token}) => ({
  title: {
    marginBlockStart: 0,
  },
  price: {
    fontSize: token.fontSizeXL,
  },
}));

const Offer: FC<IOfferProps> = ({
  data,
  multiple,
  maxQty,
  selectedQty,
  onChangeQty,
}) => {
  const {styles} = useStyles();

  const {id, title, description, price} = data || {};

  const Title = memo(
    withSkeleton(AntdTitle, isNullOrUndefined(title), {
      title: true,
      paragraph: false,
    })
  );

  const Description = memo(
    withSkeleton(AntdParagraph, isNullOrUndefined(description), {
      title: false,
      paragraph: {rows: 2},
    })
  );

  const Price = memo(
    withSkeleton(AntdText, isNullOrUndefined(price), {
      title: false,
      paragraph: {rows: 1, width: 100},
    })
  );

  return (
    <Card>
      <Title level={3} className={styles.title}>
        {title}
      </Title>
      <Description>{description}</Description>
      <TagOutlined className={styles.price} />
      &nbsp;
      <Price className={styles.price} italic>{`$${price}`}</Price>
      <Divider />
      {multiple && selectedQty ? (
        <QuantitySelector
          qty={selectedQty}
          maxQty={maxQty!}
          onChange={qty => onChangeQty?.(qty)}
        />
      ) : (
        <ActionButton
          type={!multiple && selectedQty ? ButtonType.REMOVE : ButtonType.ADD}
          disabled={isNullOrUndefined(id) || maxQty === 0}
          onClick={() => onChangeQty?.(!multiple && selectedQty ? 0 : 1)}
        />
      )}
    </Card>
  );
};

/**
 * Need to set the displayName explicitly to show it properly in the "Source" panel of Canvas
 */
Offer.displayName = 'Offer';

Offer.defaultProps = {
  multiple: false,
  maxQty: 10,
  selectedQty: undefined,
  onChangeQty: undefined,
};

export default memo(Offer) as typeof Offer;
