import React from 'react';

import { Formik, Form /* Field, ErrorMessage */ } from 'formik';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SearchLocation from '../../components/SearchLocation';
import { Container } from './styles';
import { FlexContainer, FlexItem } from '../../components/FlexContainer';

function newTrip() {
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
          departureLocation: { name: '', lat_lon: [] },
          arriveLocation: { name: '', lat_lon: [] },
        }}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <FlexContainer>
              <FlexItem>
                <SearchLocation name="departureLocation" label="Origem" />
                <SearchLocation name="arriveLocation" label="Destino" />
              </FlexItem>
              <FlexItem>
                <MapContainer
                  style={{ height: '100%', minHeight: '400px' }}
                  center={mapCenter}
                  zoom="10"
                  bounds={getBounds([
                    // props.values.departureLocation.lat_lon,
                    // props.values.arriveLocation.lat_lon,
                    [-6.8937, -38.5531],
                    [-7.0212, -37.278],
                  ])}
                >
                  <TileLayer
                    attribution="&amp;copy Google"
                    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {props.values.departureLocation.lat_lon.length === 2 && (
                    <Marker position={props.values.departureLocation.lat_lon}>
                      <Popup>Origem</Popup>
                    </Marker>
                  )}
                  {props.values.arriveLocation.lat_lon.length === 2 && (
                    <Marker position={props.values.arriveLocation.lat_lon}>
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
