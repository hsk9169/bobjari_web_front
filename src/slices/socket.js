import { createSlice } from "@reduxjs/toolkit";

const initialSocketState = {
    chatList: [],
    socketId: null,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState: initialSocketState,
    reducers: {
        getSocketId: (state, action) => {
            state.socketId = action.socketId 
        }
    }
});

export const { getSocketId } = socketSlice.actions;
export const selectSocket = (state) => state.socket;
export default socketSlice.reducer;