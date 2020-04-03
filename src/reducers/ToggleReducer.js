export const ToggleReducer = (state = false, action) => {
    switch(action.name) {
        case 'ON':
            return true;
        case 'OFF':
            return false;
        default:
            return state
    }
};
