import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowForwardSharp } from 'react-icons/io5';
import { BiTimeFive } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import {
  Container,
  AvatarContainer,
  LocationContainer,
  TimeContainer,
} from './styles';
import { loadTripRequest } from '../../store/modules/trip/actions';
import AvatarTableItem from '../../components/AvatarTableItem';

function updateTrip({ match }) {
  const dispatch = useDispatch();
  const { _id } = match.params;
  const { loading, trip } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(loadTripRequest(_id));
  }, []);
  useEffect(() => {
    console.tron.log(trip);
  }, [trip]);
  return (
    <Container>
      <AvatarContainer>
        <div>
          <h2>Motorista</h2>
          <AvatarTableItem
            large
            src={
              (trip.driver && trip.driver.avatar && trip.driver.avatar.url) ||
              ''
            }
            label={trip.driver ? trip.driver.name : ''}
          />
        </div>
        <div>
          <h2>Veículo</h2>
          <AvatarTableItem
            large
            src={
              (trip.vehicle && trip.vehicle.image && trip.vehicle.image.url) ||
              ''
            }
            label={trip.vehicle ? trip.vehicle.description : ''}
          />
        </div>
      </AvatarContainer>
      <LocationContainer>
        <div>
          <div>
            <h2>Local de Saída</h2>
            <MdLocationOn />
          </div>
          <h3>
            {(trip.departureLocation &&
              trip.departureLocation.name.split(',')[0]) ||
              ''}
          </h3>
        </div>
        <IoArrowForwardSharp />
        <div>
          <div>
            <h2>Local de Chegada</h2>
            <MdLocationOn />
          </div>
          <h3>
            {(trip.arrivalLocation &&
              trip.arrivalLocation.name.split(',')[0]) ||
              ''}
          </h3>
        </div>
      </LocationContainer>
      <TimeContainer>
        <div>
          <h2>Hora da partida</h2>
          <h3>
            {`${new Date(trip.startTime).toLocaleDateString()} ${new Date(
              trip.startTime
            ).toLocaleTimeString()}`}
          </h3>
        </div>
        <BiTimeFive />
        <div>
          <h2>Hora da chegada</h2>
          <h3>
            {trip.endTime
              ? `${new Date(trip.endTime).toLocaleDateString()} ${new Date(
                  trip.endtTime
                ).toLocaleTimeString()}`
              : '--/--/-- --:--'}
          </h3>
        </div>
      </TimeContainer>
    </Container>
  );
}

export default updateTrip;
