import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../components/Img';
import { Container } from './styles';

import {
  loadVehicleRequest,
  updateVehicleRequest,
} from '../../store/modules/vehicle/actions';

function updateVehicle({ match }) {
  const dispatch = useDispatch();
  const { _id } = match.params;
  const { loading, saving, vehicle } = useSelector((state) => state.vehicle);
  useEffect(() => {
    dispatch(loadVehicleRequest(_id));
  }, []);
  function handleSubmit(values) {
    console.tron.log(values);
    dispatch(updateVehicleRequest(_id, values));
  }
  return (
    <Container>
      <h2>Editar Veículo</h2>
      {loading ? (
        'Carregando...'
      ) : (
        <Formik
          initialValues={vehicle}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          <Form>
            <Img name="image" />
            <label htmlFor="description">
              Descrição
              <Field
                type="text"
                id="description"
                name="description"
                placeholder="Descrição"
              />
              <ErrorMessage name="description" />
            </label>

            <label htmlFor="model">
              Modelo
              <Field type="text" id="model" name="model" placeholder="Modelo" />
              <ErrorMessage name="model" />
            </label>

            <label htmlFor="manufacturingYear">
              Ano de fabricação
              <Field
                type="number"
                id="manufacturingYear"
                name="manufacturingYear"
                placeholder="Ano de fabricação"
                min={1900}
                max={2099}
              />
              <ErrorMessage name="manufacturingYear" />
            </label>

            <label htmlFor="brand">
              Fabricante
              <Field
                type="text"
                id="brand"
                name="brand"
                placeholder="Fabricante"
              />
              <ErrorMessage name="Fabricante" />
            </label>

            <label htmlFor="paintColor">
              Cor
              <Field
                type="text"
                id="paintColor"
                name="paintColor"
                placeholder="Cor"
              />
              <ErrorMessage name="paintColor" />
            </label>

            <label htmlFor="licensePlate">
              Placa
              <Field
                type="text"
                id="licensePlate"
                name="licensePlate"
                placeholder="Placa"
              />
              <ErrorMessage name="licensePlate" />
            </label>
            <div>
              <Field type="checkbox" id="active" name="active" />
              Ativo
            </div>

            <button type="submit">{saving ? 'Salvando...' : 'Salvar'}</button>
          </Form>
        </Formik>
      )}
    </Container>
  );
}

export default updateVehicle;

updateVehicle.propTypes = {
  match: {
    params: {
      _id: PropTypes.string.isRequired,
    },
  },
};
