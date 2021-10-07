import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
    articles: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            // push breaks state's immutable
            //state.articles.push(action.payload);
            // return with current state. use 'spread-> [*,*]'
            return {...state, articles: [...state.articles, action.payload] };
        default:
            return state;
    }
};

export default rootReducer;