import { ADD_ARTICLE, EDIT_ARTICLE, DEL_ARTICLE, DEL_ARTICLE_ALL } from '../constants/action-types';

export const addArticle = article => ({
    type: ADD_ARTICLE,
    payload: article
});

export const editArticle = title => ({
    type: EDIT_ARTICLE,
    payload: title
});

export const delArticle = title => ({
    type: DEL_ARTICLE,
    payload: title
});

export const delArticleAll = () => ({
    type: DEL_ARTICLE_ALL
})