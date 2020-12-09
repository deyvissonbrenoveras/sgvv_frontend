import React, { useEffect } from 'react';
import * as Yup from 'yup';
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
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    newPassword: Yup.string().min(6, 'Mínimo de 6 caracteres').notRequired(),
    password: Yup.string().when('newPassword', {
      is: (newPassword) => newPassword,
      then: Yup.string().required('Insira a senha atual'),
    }),
    confirmNewPassword: Yup.string().when('newPassword', {
      is: (confirmNewPassword) => confirmNewPassword,
      then: Yup.string()
        .min(6, 'Mínimo de 6 caracteres')
        .oneOf([Yup.ref('newPassword'), null], 'As senhas não conferem')
        .required('Insira a confirmação de senha'),
    }),
  });
  const { _id } = match.params;
  const { loading, driver } = useSelector((state) => state.driver);
  useEffect(() => {
    dispatch(loadDriverRequest(_id));
  }, []);
  function handleSubmit(values) {
    console.tron.log(values);
    dispatch(updateDriverRequest(_id, values));
  }
  return (
    <Container>
      <h2>Editar Motorista</h2>
      {loading ? (
        'Carregando...'
      ) : (
        <Formik
          initialValues={{
            ...driver,
            password: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          enableReinitialize
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Img name="avatar" />

            <label htmlFor="name">
              Nome
              <Field type="text" id="name" name="name" placeholder="Nome" />
              <ErrorMessage name="name" />
            </label>

            <label htmlFor="password">
              Senha atual
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
                type="password"
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
