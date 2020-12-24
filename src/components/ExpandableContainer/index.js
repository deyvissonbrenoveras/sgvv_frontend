import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';
import { BiExpand } from 'react-icons/bi';
import { Container, ExpandButton } from './styles';

function ExpandableContainer({ children, expanded, toggleExpanded }) {
  return (
    <>
      <ExpandButton type="button" onClick={toggleExpanded} expanded={expanded}>
        <BiExpand size="22px" />
      </ExpandButton>
      <Container expanded={expanded}>{children}</Container>
    </>
  );
}

export default ExpandableContainer;
ExpandableContainer.propTypes = {
  children: PropTypes.element.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
};
