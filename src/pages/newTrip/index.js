import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import PropTypes, { number } from 'prop-types';

import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
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
  const validationSchema = Yup.object().shape({
    driver: Yup.string().required('O motorista é obrigatório'),
    vehicle: Yup.string().required('O veículo é obrigatório'),
    departureLocation: Yup.object()
      .shape({
        name: Yup.string().required(),
        latLon: Yup.array()
          .of(Yup.number().required())
          .min(2)
          .max(2)
          .required(),
      })
      .required('O local de saída obrigatório'),
    arrivalLocation: Yup.object()
      .shape({
        name: Yup.string().required(),
        latLon: Yup.array()
          .of(Yup.number().required())
          .min(2)
          .max(2)
          .required(),
      })
      .required('O local de destino é obrigatório'),
    amount: Yup.number()
      .min(0, 'A quantia não pode ser negativa')
      .required('A quantia solicitada é obrigatória'),
  });
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
            <Popup>Saída</Popup>
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
        validationSchema={validationSchema}
        initialValues={{
          driver: '',
          vehicle: '',
          departureLocation: { name: '', latLon: [] },
          arrivalLocation: { name: '', latLon: [] },
          amount: 0,
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <FlexContainer>
              <FlexItem>
                {loadingDrivers ? (
                  'Carregando motoristas...'
                ) : (
                  <label htmlFor="driver">
                    Motorista
                    <Field as="select" name="driver">
                      <option value="" selected disabled hidden>
                        Selecione o motorista
                      </option>
                      {driversList &&
                        driversList.map((driver) => (
                          <option value={driver._id}>{driver.name}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="driver" />
                  </label>
                )}
                {loadingVehicles ? (
                  'Carregando veículos...'
                ) : (
                  <label htmlFor="vehicle">
                    Veículos
                    <Field as="select" name="vehicle">
                      <option value="" selected disabled hidden>
                        Selecione o veículo
                      </option>
                      {vehiclesList &&
                        vehiclesList.map((vehicle) => (
                          <option value={vehicle._id}>
                            {vehicle.description}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage name="vehicle" />
                  </label>
                )}
                <SearchLocation
                  name="departureLocation"
                  label="Local de saída"
                />
                <SearchLocation
                  name="arrivalLocation"
                  label="Local de destino"
                />
                <label htmlFor="amount">
                  Quantia solicitada R$
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
