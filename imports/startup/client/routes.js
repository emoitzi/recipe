import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from '../../ui/App.jsx';
import Recipe from '../../ui/pages/Recipe.jsx';
import AddRecipe from '../../ui/pages/AddRecipe.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';
import Home from  '../../ui/pages/Home.jsx';

export const renderRoutes = ()  => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="recipe" >
        <Route path="add" component={AddRecipe} />
        <Route path=":id" component={Recipe} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
