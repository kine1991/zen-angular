import * as UserActions from './user.actions';


export interface State {
  users: any;
  user: any;
  loading: boolean;
  userError: string;
}

const initialState = {
  users: [],
  user: null,
  loading: false,
  userError: null
};

export const userReducer = (state = initialState, action: UserActions.UserActions) => {
  switch (action.type) {
    case UserActions.FETCH_USERS_START:
      return {
        ...state,
        loading: true
      };
    case UserActions.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };

    case UserActions.FETCH_USER_START:
      return {
        ...state,
        loading: true
      };
    case UserActions.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    default:
      return state;
  }
};
