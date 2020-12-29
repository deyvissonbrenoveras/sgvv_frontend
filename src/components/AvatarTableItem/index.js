import React from 'react';
import PropTypes from 'prop-types';
import { BsImage } from 'react-icons/bs';
import { Container } from './styles';

function AvatarTableItem({ src, label, large }) {
  return (
    <Container large={large}>
      {src ? <img src={src} alt={label} /> : <BsImage />}
      <div>{label}</div>
    </Container>
  );
}

export default AvatarTableItem;

AvatarTableItem.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  large: PropTypes.bool.isRequired,
};
