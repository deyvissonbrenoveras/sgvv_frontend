import React from 'react';
import PropTypes from 'prop-types';
import { BsImage } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Container, Item } from './styles';

export function ListContainer({ children }) {
  return <Container>{children}</Container>;
}

export function ListItem({ to, avatarUrl, title }) {
  return (
    <Item>
      <Link to={to}>
        {avatarUrl ? <img src={avatarUrl} alt={title} /> : <BsImage />}
        <div>{title}</div>
      </Link>
    </Item>
  );
}

ListContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

ListItem.propTypes = {
  to: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
