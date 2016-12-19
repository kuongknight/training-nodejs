import React from 'react'
import {IndexRoute, Route} from 'react-router'
import {
    App,
    Home,
    Book,
    NotFound,
    Login,
    Active
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }

      <Route path="book" component={Book}/>
      <Route path="login" component={Login}/>
      <Route path="active/:token" component={Active}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
