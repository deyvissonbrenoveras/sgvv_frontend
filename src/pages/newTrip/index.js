import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SearchLocation from '../../components/SearchLocation';
import { Container } from './styles';
import { FlexContainer, FlexItem } from '../../components/FlexContainer';

import { loadDriversRequest } from '../../store/modules/driver/actions';
import { loadVehiclesRequest } from '../../store/modules/vehicle/actions';

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
    console.tron.log(values);
  }
  function getBounds(positions) {
    const latLngs = positions.map((position) => {
      return L.latLng(position[0], position[1]);
    });
    return L.latLngBounds(latLngs);
  }
  return (
    <Container>
      <Formik
        initialValues={{
          departureLocation: { name: '', latLon: [] },
          arriveLocation: { name: '', latLon: [] },
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
                <SearchLocation name="arriveLocation" label="Destino" />
              </FlexItem>
              <FlexItem>
                <MapContainer
                  style={{ height: '100%', minHeight: '400px' }}
                  center={mapCenter}
                  zoom="10"
                  bounds={getBounds([
                    [-6.8937, -38.5531],
                    [-7.0212, -37.278],
                  ])}
                >
                  <TileLayer
                    attribution="&amp;copy Google"
                    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {props.values.departureLocation.latLon.length === 2 && (
                    <Marker position={props.values.departureLocation.latLon}>
                      <Popup>Origem</Popup>
                    </Marker>
                  )}
                  {props.values.arriveLocation.latLon.length === 2 && (
                    <Marker position={props.values.arriveLocation.latLon}>
                      <Popup>Origem</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </FlexItem>
            </FlexContainer>

            <button type="submit">Salvar</button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default newTrip;
