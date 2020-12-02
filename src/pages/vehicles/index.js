import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from './styles';
import { ListContainer, ListItem } from '../../components/List';
import { loadVehiclesRequest } from '../../store/modules/vehicle/actions';
import AddButton from '../../components/AddButton';

function vehicles() {
  const dispatch = useDispatch();
  const { loading, vehicles: vehiclesList } = useSelector(
    (state) => state.vehicle
  );
  useEffect(() => {
    dispatch(loadVehiclesRequest());
  }, []);
  return (
    <>
      <AddButton to="/novoveiculo" />
      <Container>
        {loading ? (
          'Carregando...'
        ) : (
          <>
            <h2>Veículos</h2>
            <ListContainer>
              {vehiclesList.map((vehicle) => (
                <ListItem
                  to={`/editarveiculo/${vehicle._id}`}
                  avatarUrl={vehicle.image ? vehicle.image.url : ''}
                  title={vehicle.description}
                />
              ))}
            </ListContainer>
          </>
        )}
      </Container>
    </>
  );
}
export default vehicles;
