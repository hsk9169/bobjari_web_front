import { createSlice } from '@reduxjs/toolkit'

const initialManageState = {
    botNav: false,
    navScreen: 'main',
    bobTab: 0,
    sessionTime: {
        expireTime: null,
        remainTime: null,
    },
    loginAlert: false
}

const manageReducer = createSlice({
    name: 'manage',
    initialState: initialManageState,
    reducers: {
        updateBotNav: (state, action) => {
            state.botNav = action.payload
        },
        updateNavScreen: (state, action) => {
            state.navScreen = action.payload
        },
        updateBobTab: (state, action) => {
            state.bobTab = action.payload
        },
        updateSessionTime: (state, action) => {
            state.sessionTime.expireTime = action.payload.expireTime
            state.sessionTime.remainTime = action.payload.remainTime
        },
        updateLoginAlert: (state, action) => {
            state.loginAlert = action.payload
        }
    }
})

export const {
    updateBotNav, 
    updateNavScreen, 
    updateBobTab, 
    updateSessionTime,
    updateLoginAlert
} = manageReducer.actions
export const selectManage = (state) => state.manage
export default manageReducer.reducer