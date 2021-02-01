import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Container } from './styles';
import Img from '../../components/Img';
import { addDriverRequest } from '../../store/modules/driver/actions';
import { FlexContainer, FlexItem } from '../../components/FlexContainer';
import history from '../../services/history';

function newDriver() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    password: Yup.string()
      .min(6, 'Mínimo de 6 caracteres')
      .required('A senha é obrigatória'),
    confirmPassword: Yup.string().when('password', {
      is: (password) => password,
      then: Yup.string()
        .min(6, 'Mínimo de 6 caracteres')
        .oneOf([Yup.ref('password'), null], 'As senhas não conferem')
        .required('Insira a confirmação de senha'),
    }),
  });
  async function handleSubmit(values) {
    dispatch(
      addDriverRequest(values, () => {
        history.push('./motoristas');
      })
    );
  }
  return (
    <Container>
      <h2>Novo Motorista</h2>
      <Formik
        initialValues={{
          name: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FlexContainer>
            <FlexItem>
              <Img name="avatar" />
            </FlexItem>
            <FlexItem>
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

              <label htmlFor="confirmPassword">
                Confirmar Senha
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmar senha"
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

export default newDriver;
