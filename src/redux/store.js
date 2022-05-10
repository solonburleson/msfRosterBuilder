import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import DevTools from './redux.devtools';

const store = () => {
    const storeCreate = createStore(
        rootReducer,
        window.__PRELOADED_STATE__,
        compose(applyMiddleware(thunk), DevTools.instrument())
    )
    return storeCreate;
}

export default store;
