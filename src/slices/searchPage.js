import { createSlice } from '@reduxjs/toolkit'

const initialSearchPageState = {
    scrollTop: 0,
    keyword: '',
    queryId: 0,
    mentorList: [],
}

const searchPageReducer = createSlice({
    name: 'searchPage',
    initialState: initialSearchPageState,
    reducers: {
        saveSearchPage: (state, action) => {
            state.scrollTop = action.payload.scrollTop
            state.keyword = action.payload.keyword
            state.queryId = action.payload.queryId
            state.mentorList = action.payload.mentorList
        },
        deleteSearchPage: (state) => {
            state.scrollTop = 0
            state.keyword = ''
            state.queryId = 0
            state.mentorList = []
        }
    }
})

export const {saveSearchPage, deleteSearchPage} = searchPageReducer.actions
export const selectSearchPage = (state) => state.searchPage
export default searchPageReducer.reducer