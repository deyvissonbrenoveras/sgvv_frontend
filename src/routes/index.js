import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Signin from '../pages/signin';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Signin} exact />
    </Switch>
  );
}
