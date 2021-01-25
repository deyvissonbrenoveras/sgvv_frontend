import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
import { FaFilter } from 'react-icons/fa';
import {
  Container,
  AvatarContainer,
  AvatarImg,
  TripsTable,
  FilterContainer,
  DateFilter,
} from './styles';
import AddButton from '../../components/AddButton';
import ExpandableContainer from '../../components/ExpandableContainer';
import { loadTripsRequest } from '../../store/modules/trip/actions';
import AvatarTableItem from '../../components/AvatarTableItem';
import history from '../../services/history';
import tripFilter from '../../util/TripFilterEnum';

function trips() {
  const dispatch = useDispatch();
  const mapCenter = [-6.8909, -38.5566];
  const [expanded, setExpanded] = useState(false);

  const { loading, trips: tripsList } = useSelector((state) => state.trip);
  useEffect(() => {
    dispatch(loadTripsRequest(null, null, tripFilter.IN_PROGRESS));
  }, []);

  useEffect(() => {}, [tripsList]);
  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function handleSubmit(values) {
    const { startTime, endTime, status } = values;
    dispatch(loadTripsRequest(startTime, endTime, status));
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
            <Marker key={trip._id} position={trip.arrivalLocation.latLon}>
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
    mapExpanded: PropTypes.bool.isRequired,
  };
  return (
    <Container>
      <AddButton to="/novaviagem" />
      <h2>Viagens</h2>
      <FilterContainer>
        <Formik
          initialValues={{
            // startTime: new Date(Date.now()).toISOString().split('T')[0],
            // endTime: new Date(Date.now()).toISOString().split('T')[0],
            status: 0,
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <label htmlFor="startTime">
              Iniciadas após:
              <Field id="startTime" type="date" name="startTime" />
            </label>
            <label htmlFor="endTime">
              Finalizadas até:
              <Field id="endTime" type="date" name="endTime" />
            </label>
            <label htmlFor="statusFilter">
              Status:
              <Field name="status" as="select" id="statusFilter">
                <option value={tripFilter.ALL}>Todas</option>
                <option value={tripFilter.FINISHED}>Encerradas</option>
                <option value={tripFilter.IN_PROGRESS}>Em andamento</option>
              </Field>
            </label>
            <button type="submit">
              Filtrar
              <FaFilter />
            </button>
          </Form>
        </Formik>
      </FilterContainer>
      <TripsTable>
        <thead>
          <tr>
            <th>Motorista</th>
            <th>Veículo</th>
            <th>Local de Saída</th>
            <th>Local de Destino</th>
            <th>Hora da partida</th>
            <th>Hora do retorno</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            'Carregando...'
          ) : (
            <>
              {tripsList.map((trip) => (
                <tr
                  key={trip._id}
                  onClick={() => {
                    history.push(`/editarviagem/${trip._id}`);
                  }}
                >
                  <td>
                    <AvatarTableItem
                      src={
                        (trip.driver &&
                          trip.driver.avatar &&
                          trip.driver.avatar.url) ||
                        ''
                      }
                      label={trip.driver ? trip.driver.name : ''}
                    />
                  </td>
                  <td>
                    <AvatarTableItem
                      src={
                        (trip.vehicle &&
                          trip.vehicle.image &&
                          trip.vehicle.image.url) ||
                        ''
                      }
                      label={trip.vehicle ? trip.vehicle.description : ''}
                    />
                  </td>
                  <td>{trip.departureLocation.name.split(',')[0]}</td>
                  <td>{trip.arrivalLocation.name.split(',')[0]}</td>
                  <td>
                    {`${new Date(
                      trip.startTime
                    ).toLocaleDateString()} ${new Date(
                      trip.startTime
                    ).toLocaleTimeString()}`}
                  </td>
                  <td>
                    {trip.endTime
                      ? `${new Date(
                          trip.endTime
                        ).toLocaleDateString()} ${new Date(
                          trip.endTime
                        ).toLocaleTimeString()}`
                      : '--/--/-- --:--'}
                  </td>
                  <td>{trip.finished ? 'encerrada' : 'Andamento'}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </TripsTable>
      {tripsList && tripsList.length > 0 && (
        <ExpandableContainer
          expanded={expanded}
          toggleExpanded={toggleExpanded}
        >
          <MapContainer
            style={{
              height: '100%',
              minHeight: expanded ? '400px' : '100%',
            }}
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
      )}
    </Container>
  );
}

export default trips;
