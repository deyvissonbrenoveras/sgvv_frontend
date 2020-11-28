import React from 'react';
import PropTypes from 'prop-types';

import { IoCarSportSharp, IoPersonSharp } from 'react-icons/io5';
import { GiCarWheel } from 'react-icons/gi';
import { Wrapper, Content, BottomMenu } from './styles';

function Dashboard({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
      <BottomMenu>
        <li>
          <IoCarSportSharp />
          <div>Veículos</div>
        </li>
        <li>
          <IoPersonSharp />
          Motoristas
        </li>
        <li>
          <GiCarWheel />
          Viajens
        </li>
      </BottomMenu>
    </Wrapper>
  );
}
export default Dashboard;

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
};
