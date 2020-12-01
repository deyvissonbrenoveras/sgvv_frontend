import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Signin from '../pages/signin';
import Dashboard from '../pages/dashboard';
import Vehicles from '../pages/vehicles';
import NewVehicle from '../pages/newVehicle';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Signin} exact />
      <Route path="/painel" component={Dashboard} exact isPrivate />
      <Route path="/veiculos" component={Vehicles} exact isPrivate />
      <Route path="/novoveiculo" component={NewVehicle} exact isPrivate />
    </Switch>
  );
}
