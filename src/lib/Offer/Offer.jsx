import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Typography} from 'antd';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {styled} from 'styled-components';

const {Paragraph, Text} = Typography;

const Offer = memo(
  ({
    data: {id, title, description, price, selected} = {},
    onSelect,
    onRemove,
  }) => (
    <Card title={title} extra={<Price>{`${price}$ / month`}</Price>}>
      <Paragraph>{description}</Paragraph>
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
    </Card>
  )
);

const Price = styled(Text)`
  margin-left: 16px;
`;

Offer.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    selected: PropTypes.bool,
  }).isRequired,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
};

Offer.defaultProps = {
  onSelect: undefined,
  onRemove: undefined,
};

export {Offer};
