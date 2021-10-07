import { ADD_ARTICLE } from "../constants/action-types";
import { DEL_ARTICLE } from "../constants/action-types";

const initialState = {
    articles: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return {...state, articles: [...state.articles, action.payload] };
        case DEL_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter(article => article.title !== action.payload.title)
            };
        default:
            return state;
    }
};

export default rootReducer;