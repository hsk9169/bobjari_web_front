import { ADD_ARTICLE, EDIT_ARTICLE, DEL_ARTICLE, DEL_ARTICLE_ALL } from "../constants/action-types";

const initialState = {
    articles: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return {
                ...state, 
                articles: [...state.articles, action.payload] 
            };
        case EDIT_ARTICLE:
            return {
                ...state,
                ...state.articles = state.articles.map(article => { 
                    if(article.title === action.payload.title) article.title = action.payload.edit;
                    return article.title;
                })
            };
        case DEL_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter(article => article.title !== action.payload.title)
            };
        case DEL_ARTICLE_ALL:
            return {
                ...state,
                articles: []
            };
        default:
            return state;
    }
};

export default rootReducer;