import { Action } from '@ngrx/store';

export const FETCH_ARTICLES_START = 'FETCH_ARTICLES_START';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const FETCH_ARTICLE_START = 'FETCH_ARTICLE_START';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE';

export interface ArticleResponseData {
  id: string;
  body: string;
  date: number;
  ratings: number;
  shortBody: string;
  tags: string[];
  title: string;
  topic: string;
  user: {
    displayName?: string,
    email: string,
    name?: string,
    photoURL?: string,
    uid: string
  };
  views: number;
}

// Fetch Articles
export class FetchArticlesStart implements Action {
  readonly type = FETCH_ARTICLES_START;
}

export class FetchArticlesSuccess implements Action {
  readonly type = FETCH_ARTICLES_SUCCESS;

  constructor(
    public payload: ArticleResponseData[]
  ) {}
}

// Fetch Article
export class FetchArticleStart implements Action {
  readonly type = FETCH_ARTICLE_START;

  constructor(public payload: string) {}
}

export class FetchArticleSuccess implements Action {
  readonly type = FETCH_ARTICLE_SUCCESS;

  constructor(
    public payload: ArticleResponseData
  ) {}
}

export type ArticleActions = FetchArticlesStart | FetchArticlesSuccess | FetchArticleStart | FetchArticleSuccess;
