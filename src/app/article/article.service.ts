import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

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
      uid,
      date: Date.now()
    }))
  }

  getArticles(){
    return from(this.afStore.collection('articles').get()).pipe(
      map(querySnapshot => {
        const articles = []
        querySnapshot.docs.forEach(doc => {
          articles.push({id: doc.id, ...doc.data()})
        })
        return articles;
      })
    )
  }

  getArticle(articleId){
    return from(this.afStore.collection('articles').doc(articleId).get()).pipe(
      map(doc => {
        return {id: doc.id, ...doc.data()}
      })
    )
  }

}
