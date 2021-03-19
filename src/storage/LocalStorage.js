import {createStore, applyMiddleware} from 'redux'
import RootReducer from '../dispatches/reducers/RootReducer'
import thunk from 'redux-thunk'

const storage = createStore(RootReducer, applyMiddleware(thunk));

export default storage;