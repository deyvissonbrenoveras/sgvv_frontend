import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { Container, AvatarContainer, AvatarImg, TripsList } from './styles';
import AddButton from '../../components/AddButton';
import ExpandableContainer from '../../components/ExpandableContainer';
import { loadTripsRequest } from '../../store/modules/trip/actions';

function trips() {
  const dispatch = useDispatch();
  const mapCenter = [-6.8909, -38.5566];
  const [expanded, setExpanded] = useState(false);

  const { trips: tripsList } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(loadTripsRequest());
  }, []);

  useEffect(() => {
    // console.tron.log(tripsList);
  }, [tripsList]);
  function toggleExpanded() {
    setExpanded(!expanded);
  }
  function SetMarkers({ mapExpanded }) {
    const map = useMap();
    map.invalidateSize();

    const locations = tripsList.map((trip) => trip.arrivalLocation.latLon);
    if (locations.length >= 1) {
      map.fitBounds(locations, { padding: expanded ? [60, 60] : [0, 0] });
    }
    if (locations.length === 1) {
      map.setZoom(10);
    }
    if (mapExpanded) {
      map.invalidateSize();
    }
    const mapEvents = useMapEvents({
      resize: () => {
        setTimeout(() => {
          mapEvents.invalidateSize();
          map.fitBounds(locations, { padding: expanded ? [60, 60] : [0, 0] });
        }, 400);
      },
      zoom: () => {
        setTimeout(() => {
          mapEvents.invalidateSize();
        }, 400);
      },
    });

    return (
      <>
        {tripsList &&
          tripsList.map((trip) => (
            <Marker position={trip.arrivalLocation.latLon}>
              {expanded && (
                <Tooltip
                  direction="top"
                  offset={[-15, -10]}
                  opacity={1}
                  permanent
                >
                  <AvatarContainer>
                    <AvatarImg
                      src={
                        trip.driver && trip.driver.avatar
                          ? trip.driver.avatar.url
                          : ''
                      }
                      alt={trip.driver && trip.driver.name}
                    />
                  </AvatarContainer>

                  <div>{trip.driver && `Motorista: ${trip.driver.name}`}</div>
                  <div>
                    {trip.vehicle && `Veículo: ${trip.vehicle.description}`}
                  </div>
                </Tooltip>
              )}
            </Marker>
          ))}
      </>
    );
  }
  SetMarkers.propTypes = {
    mapExpanded: PropTypes.func.isRequired,
  };
  return (
    <Container>
      <AddButton to="/novaviagem" />

      {!expanded && tripsList && tripsList.length > 0 && (
        <TripsList>
          {tripsList.map((trip) => (
            <li>
              <a href="/">{trip.driver.name}</a>
            </li>
          ))}
        </TripsList>
      )}

      <ExpandableContainer expanded={expanded} toggleExpanded={toggleExpanded}>
        <MapContainer
          style={{ height: '100%', minHeight: expanded ? '400px' : '100%' }}
          center={mapCenter}
          zoom={7}
          zoomControl={false}
        >
          {expanded && <ZoomControl />}

          <TileLayer
            attribution="&amp;copy Google"
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {tripsList && <SetMarkers mapExpanded={expanded} />}
        </MapContainer>
      </ExpandableContainer>
    </Container>
  );
}

export default trips;
