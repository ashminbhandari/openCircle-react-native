//To combine all reducers
import { combineReducers } from 'redux';

//All reducers
import { ToggleReducer } from './ToggleReducer';

const combinedReducer = combineReducers({
    toggle: ToggleReducer
});

export default combinedReducer;