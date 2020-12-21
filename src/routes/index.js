import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Signin from '../pages/signin';
import Dashboard from '../pages/dashboard';
import Vehicles from '../pages/vehicles';
import NewVehicle from '../pages/newVehicle';
import UpdateVehicle from '../pages/updateVehicle';
import Drivers from '../pages/drivers';
import NewDriver from '../pages/newDriver';
import UpdateDriver from '../pages/updateDriver';
import Trips from '../pages/trips';
import NewTrip from '../pages/newTrip';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Signin} exact />
      <Route path="/painel" component={Dashboard} exact isPrivate />

      <Route path="/veiculos" component={Vehicles} exact isPrivate />
      <Route path="/novoveiculo" component={NewVehicle} exact isPrivate />
      <Route
        path="/editarveiculo/:_id"
        component={UpdateVehicle}
        exact
        isPrivate
      />

      <Route path="/motoristas" component={Drivers} exact isPrivate />
      <Route path="/novomotorista" component={NewDriver} exact isPrivate />
      <Route
        path="/editarmotorista/:_id"
        component={UpdateDriver}
        exact
        isPrivate
      />

      <Route path="/viagens" component={Trips} exact isPrivate />
      <Route path="/novaviagem" component={NewTrip} exact isPrivate />
    </Switch>
  );
}
