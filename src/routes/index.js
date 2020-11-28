import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Signin from '../pages/signin';
import Dashboard from '../pages/dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Signin} exact />
      <Route path="/painel" component={Dashboard} exact isPrivate />
    </Switch>
  );
}
