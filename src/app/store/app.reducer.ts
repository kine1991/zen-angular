import { ActionReducerMap } from '@ngrx/store';

import * as fromArticle from '../article/store/article.reducer';

export interface AppState {
  article: any;
}

const initialState = {
  article: null,
};

export const appReducer: ActionReducerMap<AppState> = {
  article: fromArticle.appReducer
};
