import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import {persistStore,persistReducer} from 'redux-persist';
import rootReducer from './combineReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const presistConfig={
    key:'root',
    storage
};

const persistedReducer=persistReducer(presistConfig,rootReducer);

export default ()=>{
    const store = createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
    const persistor=persistStore(store);
    return {store,persistor};
};