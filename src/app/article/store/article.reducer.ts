import * as ArticleActions from './article.actions';

export interface State {
  articles: any;
  article: any;
  loading: boolean;
  articleError: string;
}

const initialState = {
  articles: [],
  article: null,
  loading: false,
  articleError: null
};

export const articleReducer = (state = initialState, action: ArticleActions.ArticleActions) => {
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

      case ArticleActions.FETCH_ARTICLES_BY_USER_ID_START:
      return {
        ...state,
        loading: true
      };
    case ArticleActions.FETCH_ARTICLES_BY_USER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload
      };
    default:
      return state;
  }
};
