import { ADD_SESSION, UPDATE_SESSION, DELETE_SESSION } from '../action-types';

export const addSession = session => ({
    type: ADD_SESSION,
    payload: session
});

export const updateSession = session => ({
    type: UPDATE_SESSION,
    payload: session
});

export const deleteSession = () => ({
    type: DELETE_SESSION
});