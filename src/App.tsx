import * as React from 'react';
import { Provider } from 'mobx-react';
// @ts-ignore
import makeInspectable from 'mobx-devtools-mst';
// @ts-ignore
import { wiretap, inspect } from 'mobx-wiretap/mst';
// @ts-ignore
import Reactotron from 'reactotron-react-js';
import { mst } from 'reactotron-mst';

import routingStore, { history } from './router';
import { Router, Switch, Route } from 'react-router';
import { RootModel } from 'models/rootModel';

import LanguageProvider from 'components/LanguageProvider/LanguageProvider';
import Home from 'containers/Home/Home';
import Login from 'containers/Login/Login';
import { translationMessages } from 'i18n';
import 'App.css';

const rootStore = RootModel.create({
  router: routingStore,
  locale: 'en',
});

if (process.env.NODE_ENV === 'development') {
  makeInspectable(rootStore);
  // Provide a name as the app name.
  wiretap('ts-boilerplate', {
    host: 'http://localhost',
    port: 4000,
  });
  inspect('Store', rootStore);

  // tell Reactotron to use this plugin
  Reactotron.configure() // we can use plugins here -- more on this later
    .use(mst())
    .connect();
  Reactotron.trackMstNode(rootStore);
}

class App extends React.Component {
  render() {
    return (
      <Provider rootStore={rootStore}>
        <LanguageProvider locale={'en'} messages={translationMessages}>
          <Router history={history}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </LanguageProvider>
      </Provider>
    );
  }
}

export default App;
