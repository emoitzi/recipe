import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import AppContainer from '../../ui/App.jsx';
import AuthenticatedAppContainer from '../../ui/AuthenticatedApp.jsx';
import Recipe from '../../ui/pages/Recipe.jsx';
import AddRecipe from '../../ui/pages/AddRecipe.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';
import Home from  '../../ui/pages/Home.jsx';
import SignInContainer from '../../ui/pages/SignIn.jsx';

export const renderRoutes = ()  => (
  <Router history={browserHistory}>
    <Route path="/" component={AuthenticatedAppContainer}>
      <IndexRoute component={Home} />
      <Route path="recipe" >
        <Route path="add" component={AddRecipe} />
        <Route path=":id" component={Recipe} />
      </Route>
    </Route>
    <Route path="/signin" component={AppContainer}>
      <IndexRoute component={SignInContainer} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);
