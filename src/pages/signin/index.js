import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { IoCarSportSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Container } from './styles';
import { signInRequest } from '../../store/modules/auth/actions';

function Signin() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .min(6, 'Mínimo de 6 caracteres')
      .required('A senha é obrigatória'),
  });
  async function handleSubmit({ email, password }) {
    dispatch(signInRequest({ email, password }));
  }
  return (
    <Container>
      <IoCarSportSharp size={100} />
      <h1>SGVV</h1>
      <h2>Login</h2>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field type="text" placeholder="e-mail" name="email" />
          <ErrorMessage name="email" />
          <Field type="password" name="password" placeholder="senha" />
          <ErrorMessage name="password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </Container>
  );
}

export default Signin;
