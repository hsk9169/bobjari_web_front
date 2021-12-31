import { ADD_SESSION, UPDATE_SESSION, DELETE_SESSION } from "constants/action-types";

/* Session
 ** role
 ** token
 */
const initialState = {
    session: [],
    
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SESSION:
            return {
                ...state, 
                session: action.payload
            };
        case UPDATE_SESSION:
            return {
                ...state,
                session: state.session.map(element => { 
                    if(element.email === action.payload.email) {
                        element.accessToken = action.payload.accessToken;
                    }
                    return state;
                })
            };
        case DELETE_SESSION:
            return {
                ...state,
                signupForm: []
            };
        default:
            return state;
    }
};

export default rootReducer;