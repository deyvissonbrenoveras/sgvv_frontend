/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { AiFillCamera } from 'react-icons/ai';
import { Container } from './styles';
import api from '../../services/api';

function Img({ name }) {
  const [src, setSrc] = useState(null);
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  useEffect(() => {
    if (value) {
      setSrc(value.url);
      setValue(value._id);
    }
  }, []);
  async function handleSubmit(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    const { _id, url } = response.data;
    setSrc(url);
    setValue(_id);
  }
  return (
    <Container>
      <label htmlFor="file">
        Selecione uma imagem
        {src ? <img src={src} alt="Imagem" /> : <AiFillCamera />}
        <input id="file" type="file" accept="image/*" onChange={handleSubmit} />
      </label>
    </Container>
  );
}

export default Img;

Img.propTypes = {
  name: PropTypes.string.isRequired,
};
