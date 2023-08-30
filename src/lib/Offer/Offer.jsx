import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Empty, Typography} from 'antd';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {styled} from 'styled-components';
import {isEmpty} from 'utils/object.utils';

const {Paragraph, Text} = Typography;

const Offer = memo(({data, onSelect, onRemove}) => {
  if (isEmpty(data)) {
    return (
      <Card>
        <Empty />
      </Card>
    );
  }

  const {id, title, description, price, selected} = data;

  return (
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
