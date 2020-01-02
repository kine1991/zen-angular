import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, from, of, Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  authChange$ = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  signIn(email: string, password: string) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  signUp(email: string, password: string, name: string) {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      switchMap(user => {
        user.user.updateProfile({ displayName: name }); // устанавилваем имя
        // tslint:disable-next-line:no-shadowed-variable
        const { uid, email } = user.user;
        return this.afStore
          .collection<User>('users')
          .doc(user.user.uid)
          .set({ name, email, uid });
      })
    );
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  async signInWithGoogle() {
    console.log('signInWithGoogle2');
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  // async signOut() {
  //   await this.afAuth.auth.signOut();
  //   // this.router.navigate(['/']);
  // }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { tap, switchMap, map } from 'rxjs/operators';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { Router } from '@angular/router';
// import { Observable, from, of, Subject } from 'rxjs';
// // import { from } from 'rxjs';

// // export interface AuthResponseData {
// //   kind: string;
// //   idToken: string;
// //   email: string;
// //   refreshToken: string;
// //   expiresIn: string;
// //   localId: string;
// //   registered?: boolean;
// // }

// export interface User {
//   uid: string;
//   email: string;
//   photoURL?: string;
//   displayName?: string;
//   myCustomData?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   user$;
//   authChange$ = new Subject<boolean>();
//   userData$ = new Subject<any>();
//   // userData

//   constructor(
//     private afAuth: AngularFireAuth,
//     private afStore: AngularFirestore,
//     // private router: Router
//   ) { }

//   signIn(email: string, password: string){
//     return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
//   }

//   signUp(email: string, password: string, name: string){
//     return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password))
//       .pipe(
//         switchMap(user => {
//           user.user.updateProfile({displayName: name}); // устанавилваем имя
//           const {uid, email} = user.user
//           return this.afStore.collection<User>('users').doc(user.user.uid).set({name, email, uid})
//         })
//       )
//   }

//   logOut(){
//     return this.afAuth.auth.signOut();
//   }

//   autoLogin(){
//     return this.user$ =  this.afAuth.authState.pipe(
//       map(userData => {
//         // console.log('authService', userData)
//         if(userData){
//           const {uid, email, displayName, phoneNumber, photoURL} = userData
//           this.authChange$.next(true);
//           this.userData$.next({uid, email, displayName, phoneNumber, photoURL})
//           // this.userData = {uid, email, displayName, phoneNumber, photoURL}
//           return of({uid, email, displayName, phoneNumber, photoURL});
//         } else{
//           this.authChange$.next(false);
//           this.userData$.next(null);
//           // this.userData = null;
//           return of(null);
//         }
//       })
//     )
//   }

// }
