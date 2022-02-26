import { createSlice } from '@reduxjs/toolkit'

const initialManageState = {
    botNav: false,
    navScreen: 'main',
    sessionTime: {
        expireTime: null,
        remainTime: null,
    }
}

const manageSlice = createSlice({
    name: 'manage',
    initialState: initialManageState,
    reducers: {
        updateBotNav: (state, action) => {
            state.botNav = action.payload
        },
        updateNavScreen: (state, action) => {
            state.navScreen = action.payload
        },
        updateSessionTime: (state, action) => {
            state.sessionTime.expireTime = action.payload.expireTime
            state.sessionTime.remainTime = action.payload.remainTime
        }
    }
})

export const {updateBotNav, updateNavScreen, updateSessionTime} = manageSlice.actions
export const selectManage = (state) => state.manage
export default manageSlice.reducer