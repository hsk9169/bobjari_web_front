import { ADD_SESSION, UPDATE_SESSION, DELETE_SESSION } from "../constants/action-types";

/* Store State Items Detail
 * session
 * { email:'...', accessToken:'...', refreshToken:'...' }
 * 
 */
const initialState = {
    session: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SESSION:
            return {
                ...state, 
                session: [...state.session, action.payload]
            };
        case UPDATE_SESSION:
            return {
                ...state,
                ...state.session = state.session.map(session => { 
                    if(session.email === action.payload.email) {
                        session.accessToken = action.payload.accessToken;
                    }
                    return session.email;
                })
            };
        case DELETE_SESSION:
            return {
                ...state,
                session: []
            };
        default:
            return state;
    }
};

export default rootReducer;