import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from './styles';
import { ListContainer, ListItem } from '../../components/List';
import { loadDriversRequest } from '../../store/modules/driver/actions';
import AddButton from '../../components/AddButton';

function drivers() {
  const dispatch = useDispatch();
  const { loading, drivers: driversList } = useSelector(
    (state) => state.driver
  );
  useEffect(() => {
    dispatch(loadDriversRequest());
  }, []);
  return (
    <>
      <AddButton to="/novomotorista" />
      <Container>
        {loading ? (
          'Carregando...'
        ) : (
          <>
            <h2>Motoristas</h2>
            <ListContainer>
              {driversList.map((driver) => (
                <ListItem
                  to={`/editarmotorista/${driver._id}`}
                  avatarUrl={driver.avatar ? driver.avatar.url : ''}
                  title={driver.name}
                />
              ))}
            </ListContainer>
          </>
        )}
      </Container>
    </>
  );
}
export default drivers;
