import React, {FC, ImgHTMLAttributes, memo, PropsWithChildren} from 'react';
import {Card, Divider, Flex, Grid, Skeleton, Typography} from 'antd';
import {isNullOrUndefined} from 'utils/object.utils';
import {createStyles} from 'antd-style';
import {TagOutlined} from '@ant-design/icons';
import {TitleProps} from 'antd/lib/typography/Title';
import {ParagraphProps} from 'antd/lib/typography/Paragraph';
import {TextProps} from 'antd/lib/typography/Text';
import {QuantitySelector} from './components/quantity-selector.component';
import {ActionButton, ActionType} from './components/action-button.component';

const {Paragraph: AntdParagraph, Text: AntdText, Title: AntdTitle} = Typography;
const {useBreakpoint} = Grid;

export interface IOfferProps {
  data: {
    id?: string;
    title?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
  };
  maxQty?: number;
  selectedQty?: number;
  onChangeQty?: (qty: number) => void;
}

const useStyles = createStyles(({token, css}) => ({
  imageSkeleton: css`
    &.ant-skeleton {
      width: 100%;

      & .ant-skeleton-image {
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
      }
    }
  `,
  image: {
    width: '100%',
    borderRadius: token.borderRadiusLG,
    aspectRatio: '1/1',
    objectFit: 'cover',
  },
  price: {
    fontSize: token.fontSizeXL,
  },
}));

const Image = memo(({src, alt, ...props}: ImgHTMLAttributes<any>) => {
  const {styles} = useStyles();

  return (
    <Skeleton.Node className={styles.imageSkeleton}>
      {src && <img alt={alt} src={src} {...props} />}
    </Skeleton.Node>
  );
});

const Title = memo(({children, ...props}: PropsWithChildren<TitleProps>) => (
  <Skeleton title paragraph={false} loading={!children}>
    <AntdTitle {...props}>{children}</AntdTitle>
  </Skeleton>
));

const Description = memo(
  ({children, ...props}: PropsWithChildren<ParagraphProps>) =>
    isNullOrUndefined(children) ? (
      <Skeleton title={false} paragraph={{rows: 2}} />
    ) : (
      <AntdParagraph {...props}>{children}</AntdParagraph>
    )
);

const Price = memo(({children, ...props}: PropsWithChildren<TextProps>) => {
  const {styles} = useStyles();

  return isNullOrUndefined(children) ? (
    <Skeleton title={false} paragraph={{rows: 1, width: 100}} />
  ) : (
    <>
      <TagOutlined className={styles.price} />
      &nbsp;
      <AntdText {...props}>{`$${children}`}</AntdText>
    </>
  );
});

const Offer: FC<IOfferProps> = ({
  data,
  maxQty = 1,
  selectedQty,
  onChangeQty,
}) => {
  const {styles} = useStyles();
  const screens = useBreakpoint();

  const {id, title, description, price, imageUrl} = data || {};
  const multiple = maxQty > 1;

  return (
    <Card>
      <Image src={imageUrl} className={styles.image} alt={title} />
      <Title level={3}>{title}</Title>
      <Description>{description}</Description>
      <Price className={styles.price}>{price}</Price>
      <Divider />
      {multiple && selectedQty ? (
        <QuantitySelector
          qty={selectedQty}
          maxQty={maxQty!}
          onChange={qty => onChangeQty?.(qty)}
          size="large"
        />
      ) : (
        <Flex justify="flex-end">
          <ActionButton
            actionType={
              !multiple && selectedQty ? ActionType.REMOVE : ActionType.ADD
            }
            type="primary"
            size="large"
            block={!screens.md}
            disabled={isNullOrUndefined(id) || maxQty === 0}
            onClick={() => onChangeQty?.(!multiple && selectedQty ? 0 : 1)}
          />
        </Flex>
      )}
    </Card>
  );
};

/**
 * Need to set the displayName explicitly to show it properly in the "Source" panel of Canvas
 */
Offer.displayName = 'Offer';

Offer.defaultProps = {
  maxQty: 1,
  selectedQty: undefined,
  onChangeQty: undefined,
};

export default memo(Offer) as typeof Offer;
