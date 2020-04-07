import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';

import * as UserActions from './user.actions';
import { UserResponseData } from './user.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  @Effect()
  fetchUsers = this.actions$.pipe(
    ofType(UserActions.FETCH_USERS_START),
    switchMap(() => {
      return this.afStore
      .collection('users')
      .get()
      .pipe(
        map(querySnapshot => {
          const users = [];
          querySnapshot.docs.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
          });
          return users;
        }),
        map(users => {
          return new UserActions.FetchUsersSuccess(users);
        })
      );
    })
  );

  @Effect()
  fetchUser = this.actions$.pipe(
    ofType(UserActions.FETCH_USER_START),
    // switchMap((id: UserActions.) => {
    switchMap((fetchUserAction: UserActions.FetchUserStart) => {
      return this.afStore
      .collection('users')
      .doc(fetchUserAction.id)
      .get()
      .pipe(
        map(querySnapshot => {
          // this.user$.next({ id: querySnapshot.id, ...querySnapshot.data() });
          return { id: querySnapshot.id, ...querySnapshot.data() };
        }),
        map((user: UserResponseData) => {
          return new UserActions.FetchUserSuccess(user);
        })
      );
    })
  );

  constructor(
    private afStore: AngularFirestore,
    private actions$: Actions,
  ) {}
}
