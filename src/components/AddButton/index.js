import React from 'react';
import PropTypes from 'prop-types';
import { IoAddOutline } from 'react-icons/io5';
import { Container } from './styles';

function AddButton({ to }) {
  return (
    <Container to={to}>
      <IoAddOutline />
    </Container>
  );
}

export default AddButton;

AddButton.propTypes = {
  to: PropTypes.string.isRequired,
};
