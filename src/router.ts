import createHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from './models/RouterStore';

const routingStore = RouterStore.create();
const browserHistory = createHistory();
export const history = syncHistoryWithStore(browserHistory, routingStore);
export default routingStore;
