import React from 'react';
import PropTypes from 'prop-types';

import { IoCarSportSharp, IoPersonSharp } from 'react-icons/io5';
import { GiCarWheel } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { Wrapper, Content, BottomMenu } from './styles';

function Dashboard({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
      <BottomMenu>
        <li>
          <Link to="/veiculos">
            <IoCarSportSharp />
            <div>Veículos</div>
          </Link>
        </li>
        <li>
          <Link to="/motoristas">
            <IoPersonSharp />
            <div>Motoristas</div>
          </Link>
        </li>
        <li>
          <Link to="/viagens">
            <GiCarWheel />
            <div>Viagens</div>
          </Link>
        </li>
      </BottomMenu>
    </Wrapper>
  );
}
export default Dashboard;

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
};
