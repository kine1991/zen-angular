import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    // private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) { }

  createArticle(title: string, body: string, user: object) {
    return from(this.afStore.collection('articles').add({
      title,
      body,
      user,
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

  getArticlesWithQuery(params){
    // console.log('params', params)
    return of(5)
  }

  getArticle(articleId){
    return from(this.afStore.collection('articles').doc(articleId).get()).pipe(
      map(doc => {
        return {id: doc.id, ...doc.data()}
      })
    )
  }

}
