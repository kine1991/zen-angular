import { ActionReducerMap } from '@ngrx/store';

import * as ArticleActions from './article.actions';

export interface State {
  articles: any;
  article: any;
  loading: boolean;
  authError: string;
}

const initialState = {
  articles: [],
  article: null,
  loading: false,
  authError: null
};

export const appReducer = (state = initialState, action: ArticleActions.ArticleActions) => {
  switch (action.type) {
    case ArticleActions.FETCH_ARTICLES_START:
      return {
        ...state,
        loading: true
      };
    case ArticleActions.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload
      };

    case ArticleActions.FETCH_ARTICLE_START:
      return {
        ...state,
        loading: true
      };
    case ArticleActions.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        article: action.payload
      };
  }
};
