import { Action } from '@ngrx/store';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_USER_START = 'FETCH_USER_START';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export interface UserResponseData {
  id: string;
  displayName: string;
  email: string;
  name: string;
  photoURL: string;
  uid: string;
}

export class FetchUsersStart implements Action {
  readonly type = FETCH_USERS_START;
}

export class FetchUsersSuccess implements Action {
  readonly type = FETCH_USERS_SUCCESS;

  constructor(public payload: UserResponseData[]) {}
}

export class FetchUsersFailure implements Action {
  readonly type = FETCH_USERS_FAILURE;

  constructor(public error: string) {}
}

export class FetchUserStart implements Action {
  readonly type = FETCH_USER_START;

  constructor(public id: string ) {}
}

export class FetchUserSuccess implements Action {
  readonly type = FETCH_USER_SUCCESS;

  constructor(public payload: UserResponseData) {}
}

export class FetchUserFailure implements Action {
  readonly type = FETCH_USER_FAILURE;

  constructor(public error: string) {}
}

export type UserActions =  FetchUsersStart | FetchUsersSuccess | FetchUsersFailure | FetchUserStart | FetchUserSuccess | FetchUserFailure;
