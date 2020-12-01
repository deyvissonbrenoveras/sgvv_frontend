import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Container } from './styles';

import { addVehicleRequest } from '../../store/modules/vehicle/actions';
import AddButton from '../../components/AddButton';

function newVehicle() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    description: Yup.string().required('A descrição é obrigatória'),
    model: Yup.string().required('O modelo é obrigatório'),
    manufacturingYear: Yup.number()
      .min(1900, 'Insira um ano válido')
      .max(2099, 'Insira um ano válido')
      .notRequired(),
    brand: Yup.string().required('O fabricante é obrigatório'),
    paintColor: Yup.string().notRequired(),
    licensePlate: Yup.string().notRequired(),
  });
  async function handleSubmit(values) {
    dispatch(addVehicleRequest(values));
  }
  return (
    <Container>
      <h2>Novo Veículo</h2>
      <Formik
        initialValues={{
          description: '',
          model: '',
          brand: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
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

          <button type="submit">Salvar</button>
        </Form>
      </Formik>
    </Container>
  );
}

export default newVehicle;
