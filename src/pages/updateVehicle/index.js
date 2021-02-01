import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../components/Img';
import { Container } from './styles';
import { FlexContainer, FlexItem } from '../../components/FlexContainer';
import history from '../../services/history';
import {
  loadVehicleRequest,
  updateVehicleRequest,
} from '../../store/modules/vehicle/actions';

function updateVehicle({ match }) {
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
  const { _id } = match.params;
  const { loading, saving, vehicle } = useSelector((state) => state.vehicle);
  useEffect(() => {
    dispatch(loadVehicleRequest(_id));
  }, []);
  function handleSubmit(values) {
    dispatch(
      updateVehicleRequest(_id, values, () => {
        history.push('/veiculos');
      })
    );
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
          validationSchema={validationSchema}
        >
          <Form>
            <FlexContainer>
              <FlexItem>
                <Img name="image" />
              </FlexItem>
              <FlexItem>
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
                  <Field
                    type="text"
                    id="model"
                    name="model"
                    placeholder="Modelo"
                  />
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
                  <ErrorMessage name="brand" />
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

                <button type="submit">
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>
              </FlexItem>
            </FlexContainer>
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
