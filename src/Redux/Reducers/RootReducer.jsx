import { combineReducers } from 'redux';
import itemReducers from './itemReducer';
import TwitterReducers from './TwitterReducers'
import userReducer from './userReducer'
import itemReducer from './itemReducer'
import uiReducer from './uiReducer'

const RootReducer = combineReducers({
    twitter: TwitterReducers,
    user : userReducer,
    item : itemReducer,
    ui : uiReducer
});

export default RootReducer;
