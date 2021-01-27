import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsersRequest } from '../../store/modules/user/actions';
import { ListContainer, ListItem } from '../../components/List';

import AddButton from '../../components/AddButton';

import { Container } from './styles';

function users() {
  const dispatch = useDispatch();

  const { loading, users: usersList } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUsersRequest());
  }, []);
  return (
    <>
      <AddButton to="/novousuario" />
      <Container>
        {loading ? (
          'Carregando...'
        ) : (
          <>
            <h2>Usuários</h2>
            <ListContainer>
              {usersList.map((user) => (
                <ListItem to={`/editarusuario/${user._id}`} title={user.name} />
              ))}
            </ListContainer>
          </>
        )}
      </Container>
    </>
  );
}

export default users;
