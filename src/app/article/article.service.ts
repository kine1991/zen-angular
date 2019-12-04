import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    // private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) { }

  createArticle(title: string, body: string, uid: string) {
    return from(this.afStore.collection('articles').add({
      title,
      body,
      uid
    }))
  }
}
