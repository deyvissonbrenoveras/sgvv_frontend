import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function AvatarTableItem({ src, label }) {
  return (
    <Container>
      <img src={src} alt={label} />
      <div>{label}</div>
    </Container>
  );
}

export default AvatarTableItem;

AvatarTableItem.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
