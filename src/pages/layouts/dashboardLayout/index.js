import React from 'react';
import PropTypes from 'prop-types';

import { IoCarSportSharp, IoPersonSharp } from 'react-icons/io5';
import { GiCarWheel } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Wrapper, Content, HeadContainer, BottomMenu } from './styles';
import { signOut } from '../../../store/modules/auth/actions';

function Dashboard({ children }) {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Wrapper>
      <Content>
        <HeadContainer>
          <h1>SGVV</h1>
          <button type="button" onClick={handleLogout}>
            <RiLogoutBoxRLine />
          </button>
        </HeadContainer>
        {children}
      </Content>
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
