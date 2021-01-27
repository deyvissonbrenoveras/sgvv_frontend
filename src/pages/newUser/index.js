import React, { useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../components/Img';
import { Container } from './styles';
import { FlexContainer, FlexItem } from '../../components/FlexContainer';
import { addUserRequest } from '../../store/modules/user/actions';

function updateDriver({ match }) {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string().notRequired(),
    confirmPassword: Yup.string().when('password', {
      is: (confirmPassword) => confirmPassword,
      then: Yup.string()
        .min(6, 'Mínimo de 6 caracteres')
        .oneOf([Yup.ref('password'), null], 'As senhas não conferem')
        .required('Insira a confirmação de senha'),
    }),
  });

  function handleSubmit(values) {
    dispatch(addUserRequest(values));
  }
  return (
    <Container>
      <h2>Novo Usuário</h2>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <FlexContainer>
            <FlexItem>
              <label htmlFor="name">
                Nome
                <Field type="text" id="name" name="name" placeholder="Nome" />
                <ErrorMessage name="name" />
              </label>
              <label htmlFor="email">
                E-mail
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                />
                <ErrorMessage name="email" />
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
              <label htmlFor="confirmPassword">
                Confirmar senha
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmar Nova senha"
                />
                <ErrorMessage name="confirmPassword" />
              </label>

              <button type="submit">Salvar</button>
            </FlexItem>
          </FlexContainer>
        </Form>
      </Formik>
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
