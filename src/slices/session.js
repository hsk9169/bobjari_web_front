import { createSlice } from "@reduxjs/toolkit";

const initialSessionState = {
    sessions: [{id: 1, session: []}],
};

const sessionReducer = createSlice({
    name: 'session',
    initialState: initialSessionState,
    reducers: {
        addSession: (state, action) => {
            const sessionId =
                Math.max(0, ...state.sessions.map((el) => Number(el.id))) + 1;
            state.sessions.push({id: sessionId, session: action.payload})
        },
        updateSession: (state, action) => {
            state.sessions[1].session = action.payload;
        },
        changeSessionRole: (state, action) => {
            state.sessions[1].session.role = action.payload;
        },
        toggleSessionSearchAllow: (state, action) => {
            state.sessions[1].session.mentor.searchAllow = action.payload;
        },
        deleteSession: (state, action) => {
            state.sessions.splice(1,1);
        }
    }
});

export const { addSession, updateSession, changeSessionRole, 
            toggleSessionSearchAllow, deleteSession } = sessionReducer.actions;
export const selectSessions = (state) => state.session.sessions;
export default sessionReducer.reducer;