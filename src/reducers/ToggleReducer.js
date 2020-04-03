export const ToggleReducer = (state = false, action) => {
    if (action.type === 'TOGGLE') {
        return !state;
    }
    else {
        return false;
    }
};
