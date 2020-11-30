import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Annoucement from './pages/Annoucement';

import Landing from './pages/Landing/index';
import Profile from './pages/Profile/index';
import SearchGame from './pages/SearcheGame/index';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />

        <Route path="/profile" component={Profile} />
        <Route path="/new" component={Annoucement} />

        <Route path="/search" component={SearchGame} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;