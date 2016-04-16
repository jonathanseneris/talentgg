/* THIS IS WHERE OUR INDEX LOOKS TO MOUNT OUR APP.
 * WE ALSO PROVIDE ALL THE ROUTES USING REACT ROUTER  */

import React from 'react';
import Router from 'react-router';
import routes from './routes';
import ga from 'react-ga';

const router = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});

ga.initialize('UA-54996226-4');
router.run((Handler, state) => {
  ga.pageview(state.pathname);
  React.render(<Handler/>, document.body);
});
