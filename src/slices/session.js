import { createSlice } from "@reduxjs/toolkit";

const initialSessionState = {
    sessions: [{id: 1, session: []}],
};

const sessionSlice = createSlice({
    name: 'session',
    initialState: initialSessionState,
    reducers: {
        addSession: (state, action) => {
            const sessionId =
                Math.max(0, ...state.sessions.map((el) => Number(el.id))) + 1;
            state.sessions.push({id: sessionId, session: action.payload})
        },
        updateSession: (state, action) => {
            const userEmail = action.payload.userInfo.email;
            state.sessions.map(el => {
                if (el.session.userInfo.email === userEmail) {
                    el.session = action.payload;
                }
                return state;
            })
        },
        deleteSession: (state, action) => {
            state.sessions.splice(1,1);
        }
    }
});

export const { addSession, updateSession, deleteSession } = sessionSlice.actions;
export const selectSessions = (state) => state.session.sessions;
export default sessionSlice.reducer;