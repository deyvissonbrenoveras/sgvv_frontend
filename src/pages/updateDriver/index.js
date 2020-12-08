import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../components/Img';
import { Container } from './styles';

import {
  loadDriverRequest,
  updateDriverRequest,
} from '../../store/modules/driver/actions';

function updateDriver({ match }) {
  const dispatch = useDispatch();
  const { _id } = match.params;
  const { loading, driver } = useSelector((state) => state.driver);
  useEffect(() => {
    dispatch(loadDriverRequest(_id));
  }, []);
  function handleSubmit(values) {
    dispatch(updateDriverRequest(_id, values));
  }
  return (
    <Container>
      <h2>Editar Motorista</h2>
      {loading ? (
        'Carregando...'
      ) : (
        <Formik
          initialValues={driver}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          <Form>
            <Img name="avatar" />

            <label htmlFor="name">
              Nome
              <Field type="text" id="name" name="name" placeholder="Nome" />
              <ErrorMessage name="name" />
            </label>

            <label htmlFor="password">
              Senha
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Senha"
              />
              <ErrorMessage name="password" />
            </label>
            <label htmlFor="newPassword">
              Nova senha
              <Field
                type="newPassword"
                id="newPassword"
                name="newPassword"
                placeholder="Nova senha"
              />
              <ErrorMessage name="newPassword" />
            </label>
            <label htmlFor="confirmNewPassword">
              Confirmar nova senha
              <Field
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirmar Nova senha"
              />
              <ErrorMessage name="confirmNewPassword" />
            </label>

            <button type="submit">Salvar</button>
          </Form>
        </Formik>
      )}
    </Container>
  );
}

export default updateDriver;

updateDriver.propTypes = {
  match: {
    params: {
      _id: PropTypes.string.isRequired,
    },
  },
};
