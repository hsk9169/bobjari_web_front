import { createSlice } from '@reduxjs/toolkit'

const initialBasePath = {
    path: '/local'
}

const basePathReducer = createSlice({
    name: 'basePath',
    initialState: initialBasePath,
    reducers: {
        setBasePath: (state, action) => {
            state.path = action.payload
        }
    }
})

export const {setBasePath} = basePathReducer.actions
export const selectBasePath = (state) => state.basePath
export default basePathReducer.reducer