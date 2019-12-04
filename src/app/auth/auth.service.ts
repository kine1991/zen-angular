import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
// import { from } from 'rxjs';


// export interface AuthResponseData {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) { }

  signIn(email: string, password: string){
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
  }

  signUp(email: string, password: string, name: string){
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password))
      .pipe( 
        switchMap(user => {
          user.user.updateProfile({displayName: name}); // устанавилваем имя
          const {uid, email} = user.user
          return this.afStore.collection<User>('users').doc(user.user.uid).set({name, email, uid})
        })
      )
  }

  logOut(){
    return this.afAuth.auth.signOut();
  }

  autoLogin(){
    this.user$ =  this.afAuth.authState.pipe(
      map(userData => {
        if(userData){
          const {uid, email, displayName, phoneNumber, photoURL} = userData
          console.log(userData)
          return {uid, email, displayName, phoneNumber, photoURL};
        } else{
          console.log('null')
          of(null);
        }
      })
    )
  }

}
