import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from './styles';
import AddButton from '../../components/AddButton';

import { loadTripsRequest } from '../../store/modules/trip/actions';

function trips() {
  const dispatch = useDispatch();
  const mapCenter = [-6.8909, -38.5566];
  const { trips: tripsList } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(loadTripsRequest());
  }, []);

  useEffect(() => {
    // console.tron.log(tripsList);
  }, [tripsList]);

  function SetMarkers() {
    const map = useMap();
    const locations = tripsList.map((trip) => trip.arrivalLocation.latLon);
    if (locations.length >= 1) {
      map.fitBounds(locations, { padding: [60, 60] });
    }
    if (locations.length === 1) {
      map.setZoom(10);
    }
    return (
      <>
        {tripsList &&
          tripsList.map((trip) => (
            <Marker position={trip.arrivalLocation.latLon}>
              <Tooltip
                direction="top"
                offset={[-15, -10]}
                opacity={1}
                permanent
              >
                <div>{trip.driver && trip.driver.name}</div>
                <div>{trip.vehicle && trip.vehicle.description}</div>
              </Tooltip>
            </Marker>
          ))}
      </>
    );
  }
  return (
    <Container>
      <AddButton to="/novaviagem" />

      <MapContainer
        style={{ height: '100%', minHeight: '400px' }}
        center={mapCenter}
        zoom={7}
      >
        <TileLayer
          attribution="&amp;copy Google"
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {tripsList && <SetMarkers />}
      </MapContainer>
    </Container>
  );
}

export default trips;
