import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Switch, Route } from 'react-router';
import { RootModel } from 'models/rootModel';
import LanguageProvider from 'components/LanguageProvider/LanguageProvider';
import Home from 'containers/Home/Home';
import Login from 'containers/Login/Login';
import { translationMessages } from 'i18n';
import 'App.css';

// const logo = require('./logo.svg');

const browserHistory = createHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const rootStore = RootModel.create({
  router: routingStore,
  locale: 'en',
});

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
