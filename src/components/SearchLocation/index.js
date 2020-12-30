import React, { useState } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import Nominatim from 'nominatim-geocoder';
import { Container, LocationList, ClearButton, LoadingIcon } from './styles';

function SearchLocation({ name, label }) {
  const geocoder = new Nominatim();
  const [, , helpers] = useField(name);
  const { setValue } = helpers;

  const [searchResult, setSearchResult] = useState({
    visible: true,
    locations: [],
  });
  const [inputState, setInputState] = useState({ value: '', readOnly: false });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [clearVisible, setClearVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  let timer = null;
  async function handleChange(e) {
    clearTimeout(timer);
    setInputState({ ...inputState, value: e.target.value });
    if (!selectedLocation) {
      setLoading(true);
      timer = setTimeout(async () => {
        setLoading(true);
        const response = await geocoder.search({ q: e.target.value });
        setSearchResult({ visible: true, locations: response });
        setLoading(false);
      }, 2000);
    }
  }

  function handleClick(location) {
    setValue({
      name: location.display_name,
      latLon: [location.lat, location.lon],
    });
    setSelectedLocation(location);
    setInputState({
      readOnly: true,
      value: location.display_name,
    });
    setSearchResult({ ...searchResult, visible: false });
    setClearVisible(true);
  }

  function handleClear() {
    setInputState({ readOnly: false, value: '' });
    setSearchResult({ visible: true, locations: [] });
    setSelectedLocation(null);
    setClearVisible(false);
    setValue({
      name: '',
      latLon: [],
    });
  }

  return (
    <Container>
      <label>
        {label}
        <ClearButton visible={clearVisible} type="button" onClick={handleClear}>
          x
        </ClearButton>
        <LoadingIcon loading={loading} />

        <br />
        <input
          name={name}
          type="text"
          onChange={handleChange}
          value={inputState.value}
          readOnly={inputState.readOnly}
          placeholder="Pesquise um local..."
          autoComplete="off"
        />
        <LocationList visible={searchResult.visible}>
          {searchResult.locations &&
            searchResult.locations.map((result) => (
              <li type="button" key={result.id}>
                <button type="button" onClick={() => handleClick(result)}>
                  {result.display_name}
                </button>
              </li>
            ))}
        </LocationList>
      </label>
    </Container>
  );
}

export default SearchLocation;

SearchLocation.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

SearchLocation.defaultProps = {
  label: '',
};
