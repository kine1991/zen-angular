import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    // private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
  ) { }

  getAllUsers(){
    return this.afStore.collection('users').get().pipe(
      map(querySnapshot => {
        const users = [];
        querySnapshot.docs.forEach(doc => {
          users.push({id: doc.id, ...doc.data()})
        })
        return users;
      })
    )
  }
}

// getArticles(){
//   return from(this.afStore.collection('articles').get()).pipe(
//     map(querySnapshot => {
//       const articles = []
//       querySnapshot.docs.forEach(doc => {
//         articles.push({id: doc.id, ...doc.data()})
//       })
//       return articles;
//     })
//   )
// }

