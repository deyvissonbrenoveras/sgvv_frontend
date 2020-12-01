import React from 'react';
import PropTypes from 'prop-types';
import { FaCarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Item } from './styles';

export function ListContainer({ children }) {
  return <Container>{children}</Container>;
}

export function ListItem({ to, avatarUrl, title }) {
  return (
    <Item>
      <Link to={to}>
        {avatarUrl ? <img src={avatarUrl} alt={title} /> : <FaCarAlt />}
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
