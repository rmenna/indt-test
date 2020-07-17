import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Logon from './pages/Logon';
import HomeAdministrador from './pages/Home/Administrador';
import HomeVisitante from './pages/Home/Visitante';
import NewBook from './pages/NewBook';
import EditBook from './pages/EditBook';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('user') === 'Administrador' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/homeVisitante', state: { from: props.location } }}
        />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Logon} exact />
        <Route path="/homeVisitante" component={HomeVisitante} />
        <PrivateRoute path="/book/new" component={NewBook} />
        <PrivateRoute path="/homeAdministrador" component={HomeAdministrador} />
        <PrivateRoute path="/book/edit" component={EditBook} />
      </Switch>
    </BrowserRouter>
  );
}
