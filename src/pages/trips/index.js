import React /* , { useState } */ from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import Nominatim from 'nominatim-geocoder';
import { Container } from './styles';
import AddButton from '../../components/AddButton';

// const geocoder = new Nominatim();

function trips() {
  // const center = [-6.8909, -38.5566];
  // // const [map, setMap] = useState(null);
  // const [state, setState] = useState({});
  // const [origem, setOrigem] = useState(null);
  // const [destino, setDestino] = useState(null);
  // async function handleClick() {
  //   // const origemResponse = await geocoder.search({ q: state.origem });
  //   // const destinoResponse = await geocoder.search({ q: state.destino });
  //   // setOrigem([origemResponse[0].lat, origemResponse[0].lon]);
  //   // setDestino([destinoResponse[0].lat, destinoResponse[0].lon]);
  // }
  return (
    <Container>
      <AddButton to="/novaviagem" />

      {/* <label>origem</label> */}
      {/* <input
        type="text"
        name="origem"
        value={state.origem}
        onChange={(e) => {
          setState({ ...state, origem: e.target.value });
        }}
      />
      <label>destino</label>
      <input
        type="text"
        name="destino"
        value={state.destino}
        onChange={(e) => {
          setState({ ...state, destino: e.target.value });
        }}
      />
      <button type="button" onClick={handleClick}>
        ok
      </button> */}
      {/* <MapContainer
        style={{ height: '90%' }}
        center={center}
        zoom="10"
        // whenCreated={setMap}
      >
        <TileLayer
          attribution="&amp;copy Google"
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {origem && (
          <Marker position={origem}>
            <Popup>Origem</Popup>
          </Marker>
        )}
        {destino && (
          <Marker position={destino}>
            <Popup>Destino</Popup>
          </Marker>
        )}
      </MapContainer> */}
    </Container>
  );
}

export default trips;
