import { ActionReducerMap } from '@ngrx/store';

import * as fromArticle from '../article/store/article.reducer';
import * as fromUser from '../user/store/user.reducer';

export interface AppState {
  article: fromArticle.State;
  user: fromUser.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  user: fromUser.userReducer,
  article: fromArticle.articleReducer,
};
