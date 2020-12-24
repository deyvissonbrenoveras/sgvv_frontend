import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes, { number } from 'prop-types';

import { Formik, Form, Field, ErrorMessage } from 'formik';
// import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import SearchLocation from '../../components/SearchLocation';
import { Container } from './styles';
import { FlexContainer, FlexItem } from '../../components/FlexContainer';

import { loadDriversRequest } from '../../store/modules/driver/actions';
import { loadVehiclesRequest } from '../../store/modules/vehicle/actions';
import { addTripRequest } from '../../store/modules/trip/actions';

function newTrip() {
  const dispatch = useDispatch();
  const { loading: loadingDrivers, drivers: driversList } = useSelector(
    (state) => state.driver
  );
  const { loading: loadingVehicles, vehicles: vehiclesList } = useSelector(
    (state) => state.vehicle
  );
  useEffect(() => {
    dispatch(loadDriversRequest());
    dispatch(loadVehiclesRequest());
  }, []);

  const mapCenter = [-6.8909, -38.5566];

  function handleSubmit(values) {
    dispatch(addTripRequest(values));
  }
  function SetMarkers({ bounds }) {
    const map = useMap();

    if (bounds[0].length === 2 || bounds[1].length === 2) {
      map.fitBounds(bounds, { padding: [60, 60] });
    }
    if (bounds[0].length !== 2 || bounds[1].length !== 2) {
      map.setZoom(10);
    }

    return (
      <>
        {bounds[0].length === 2 && (
          <Marker position={bounds[0]}>
            <Popup>Origem</Popup>
          </Marker>
        )}
        {bounds[1].length === 2 && (
          <Marker position={bounds[1]}>
            <Popup>Destino</Popup>
          </Marker>
        )}
      </>
    );
  }
  SetMarkers.propTypes = {
    bounds: PropTypes.arrayOf(number).isRequired,
  };
  return (
    <Container>
      <h2>Nova viagem</h2>
      <Formik
        initialValues={{
          departureLocation: { name: '', latLon: [] },
          arrivalLocation: { name: '', latLon: [] },
          amount: 0,
        }}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <FlexContainer>
              <FlexItem>
                <label htmlFor="startTime">
                  Hora da partida
                  <Field
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    placeholder="Hora da partida"
                  />
                  <ErrorMessage name="startTime" />
                </label>
                {loadingDrivers ? (
                  'Carregando motoristas...'
                ) : (
                  <label htmlFor="driver">
                    Motorista
                    <Field as="select" name="driver">
                      {driversList &&
                        driversList.map((driver, index) => (
                          <option value={driver._id} selected={index === 0}>
                            {driver.name}
                          </option>
                        ))}
                    </Field>
                  </label>
                )}

                {loadingVehicles ? (
                  'Carregando veículos...'
                ) : (
                  <label htmlFor="vehicle">
                    Veículos
                    <Field as="select" name="vehicle">
                      {vehiclesList &&
                        vehiclesList.map((vehicle) => (
                          <option value={vehicle._id}>
                            {vehicle.description}
                          </option>
                        ))}
                    </Field>
                  </label>
                )}

                <SearchLocation name="departureLocation" label="Origem" />
                <SearchLocation name="arrivalLocation" label="Destino" />

                <label htmlFor="amount">
                  Valor R$
                  <Field
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Valor"
                  />
                  <ErrorMessage name="amount" />
                </label>
                <button type="submit">Salvar</button>
              </FlexItem>
              <FlexItem>
                <MapContainer
                  style={{ height: '100%', minHeight: '400px' }}
                  center={mapCenter}
                  zoom={7}
                >
                  <TileLayer
                    attribution="&amp;copy Google"
                    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <SetMarkers
                    bounds={[
                      props.values.departureLocation.latLon,
                      props.values.arrivalLocation.latLon,
                    ]}
                  />
                </MapContainer>
              </FlexItem>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default newTrip;
