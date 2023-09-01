import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Empty, Space, Typography} from 'antd';
import {styled} from 'styled-components';
import {isEmpty} from 'utils/object.utils';
import {ReactComponent as EmptyIcon} from './empty.svg';

const {Paragraph, Text} = Typography;

const Offer = memo(({data, selected, onSelect, onRemove}) => {
  if (isEmpty(data)) {
    return (
      <Card>
        <Empty description={"It's empty"} image={<EmptyIcon />} />
      </Card>
    );
  }

  const {id, title, description, price} = data;

  return (
    <Card
      title={title}
      extra={(price && <Price>{`${price}$ / month`}</Price>) || null}>
      {description && <Paragraph>{description}</Paragraph>}
      <Space direction="vertical" align="end" style={{display: 'flex'}}>
        {selected ? (
          <Button
            shape="round"
            icon={<MinusOutlined />}
            onClick={() => onRemove?.(id)}
            danger>
            Remove
          </Button>
        ) : (
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            onClick={() => onSelect?.(id)}>
            Add
          </Button>
        )}
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

export {Offer};
