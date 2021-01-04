import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowForwardSharp, IoTimeSharp } from 'react-icons/io5';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { BiTimeFive } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import {
  Container,
  AvatarContainer,
  LocationContainer,
  TimeContainer,
  CloseButton,
  AmountContainer,
  AmountBox,
  Amount,
  AmountSpent,
  ReturnedAmount,
} from './styles';
import {
  loadTripRequest,
  updateTripRequest,
} from '../../store/modules/trip/actions';
import AvatarTableItem from '../../components/AvatarTableItem';

function updateTrip({ match }) {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    amountSpent: Yup.number().positive('O valor deve ser positivo'),
  });
  const mapCenter = [-6.8909, -38.5566];
  const [trip, setTrip] = useState({});
  const { _id } = match.params;
  const { loading, trip: tripToUpdate } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(loadTripRequest(_id));
  }, []);
  function handleSubmit(values) {
    dispatch(updateTripRequest(_id, values));
  }
  useEffect(() => {
    const localStartTime = `${new Date(
      tripToUpdate.startTime
    ).toLocaleDateString()} ${new Date(
      tripToUpdate.startTime
    ).toLocaleTimeString()}`;

    const localEndTime = tripToUpdate.endTime
      ? `${new Date(tripToUpdate.endTime).toLocaleDateString()} ${new Date(
          tripToUpdate.endTime
        ).toLocaleTimeString()}`
      : '--/--/-- --:--';

    let timeDifference = '';
    if (tripToUpdate && tripToUpdate.startTime) {
      timeDifference = formatDistance(
        new Date(tripToUpdate.startTime),
        tripToUpdate.endTime
          ? new Date(tripToUpdate.endTime)
          : new Date(Date.now()),
        { locale: ptBR, includeSeconds: false }
      );
    }
    let returnedAmount = 0;
    if (trip.finished) {
      returnedAmount = tripToUpdate.amount - tripToUpdate.amountSpent;
    }
    setTrip({
      ...tripToUpdate,
      timeDifference,
      localEndTime,
      localStartTime,
      returnedAmount,
    });
  }, [tripToUpdate]);

  function SetMarkers({ departureLocation, arrivalLocation }) {
    const map = useMap();
    map.invalidateSize();

    map.fitBounds([departureLocation, arrivalLocation], {
      padding: [80, 80],
    });
    // map.setZoom(7.5);

    const mapEvents = useMapEvents({
      resize: () => {
        setTimeout(() => {
          mapEvents.invalidateSize();
          map.fitBounds([departureLocation, arrivalLocation], {
            padding: [60, 60],
          });
        }, 400);
      },
      zoom: () => {
        setTimeout(() => {
          mapEvents.invalidateSize();
        }, 400);
      },
    });

    return (
      <>
        <Marker position={departureLocation}>
          <Tooltip direction="top" offset={[-15, -10]} opacity={1} permanent>
            Saída
          </Tooltip>
        </Marker>
        <Marker position={arrivalLocation}>
          <Tooltip direction="top" offset={[-15, -10]} opacity={1} permanent>
            Destino
          </Tooltip>
        </Marker>
      </>
    );
  }
  SetMarkers.propTypes = {
    departureLocation: PropType.arrayOf(PropType.number).isRequired,
    arrivalLocation: PropType.arrayOf(PropType.number).isRequired,
  };
  return (
    <Container>
      {loading ? (
        'Carregando...'
      ) : (
        <>
          <AvatarContainer>
            <div>
              <h2>Motorista</h2>
              <AvatarTableItem
                large
                src={
                  (trip.driver &&
                    trip.driver.avatar &&
                    trip.driver.avatar.url) ||
                  ''
                }
                label={trip.driver ? trip.driver.name : ''}
              />
            </div>
            <AmountContainer>
              <div>
                <AmountBox>
                  <div>Quantia solicitada:</div>
                  <Amount>{`R$ ${trip.amount}`}</Amount>
                </AmountBox>
                {trip.finished ? (
                  <AmountBox>
                    <div>Quantia gasta:</div>
                    <AmountSpent>{`R$ ${trip.amountSpent}`}</AmountSpent>
                  </AmountBox>
                ) : (
                  <Formik
                    initialValues={{ amountSpent: 0 }}
                    enableReinitialize
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    <Form>
                      <label>
                        Quantia gasta:
                        <Field
                          type="number"
                          id="amountSpent"
                          name="amountSpent"
                          placeholder="Insira a quantia"
                          min="0"
                        />
                        <ErrorMessage name="amountSpent" />
                      </label>

                      <CloseButton type="submit">Encerrar viagem</CloseButton>
                    </Form>
                  </Formik>
                )}
              </div>

              {trip && trip.finished ? (
                <>
                  <AmountBox>
                    <div>Retornado: </div>
                    <ReturnedAmount>
                      {`R$ ${trip.returnedAmount}`}
                    </ReturnedAmount>
                  </AmountBox>
                  <div>Viagem encerrada</div>
                </>
              ) : (
                ''
              )}
            </AmountContainer>
            <div>
              <h2>Veículo</h2>
              <AvatarTableItem
                large
                src={
                  (trip.vehicle &&
                    trip.vehicle.image &&
                    trip.vehicle.image.url) ||
                  ''
                }
                label={trip.vehicle ? trip.vehicle.description : ''}
              />
            </div>
          </AvatarContainer>
          <LocationContainer>
            <div>
              <div>
                <h2>Saída</h2>
                <MdLocationOn />
              </div>
              <h3>
                {(trip.departureLocation &&
                  trip.departureLocation.name.split(',')[0]) ||
                  ''}
              </h3>
            </div>
            <IoArrowForwardSharp />
            <div>
              <div>
                <h2>Destino</h2>
                <MdLocationOn />
              </div>
              <h3>
                {(trip.arrivalLocation &&
                  trip.arrivalLocation.name.split(',')[0]) ||
                  ''}
              </h3>
            </div>
          </LocationContainer>
          <TimeContainer>
            <div>
              <h2>Hora da partida</h2>
              <h3>{trip.localStartTime}</h3>
            </div>
            <div>
              <BiTimeFive />
              <div>Tempo decorrido:</div>
              <div>{trip.timeDifference}</div>
            </div>
            <div>
              <h2>Hora do retorno</h2>
              <h3>{trip.localEndTime}</h3>
            </div>
          </TimeContainer>
          <MapContainer
            style={{
              width: '90%',
              // height: '100%',
              // minHeight: '400px',
              height: '350px',
              margin: '0 auto',
            }}
            center={mapCenter}
            zoom={7}
            zoomControl={false}
            doubleClickZoom={false}
            closePopupOnClick={false}
            false
            dragging={false}
            zoomSnap={false}
            zoomDelta={false}
            trackResize={false}
            touchZoom={false}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution="&amp;copy Google"
              url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {trip && trip.departureLocation && trip.arrivalLocation && (
              <SetMarkers
                departureLocation={trip.departureLocation.latLon}
                arrivalLocation={trip.arrivalLocation.latLon}
              />
            )}
          </MapContainer>
        </>
      )}
    </Container>
  );
}

export default updateTrip;
