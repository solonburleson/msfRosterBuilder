import { combineReducers } from "redux";
import inventoryReducer from './inventoryReducer';
import characterListReducer from './characterListReducer';
import rosterReducer from'./rosterReducer';

const rootReducer = {
    inventoryReducer,
    characterListReducer,
    rosterReducer
};

export default combineReducers(rootReducer);