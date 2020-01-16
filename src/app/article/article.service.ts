import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// import { /*Observable, from, of,*/ Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public onChangeFilter$ = new Subject();

  constructor(
    // private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {}

  createArticle(title: string, body: string, user: object) {
    return from(
      this.afStore.collection('articles').add({
        title,
        body,
        user,
        date: Date.now()
      })
    );
  }

  updateArticle(title: any, body: any, id: string) {
    return this.afStore.collection('articles').doc(id).update({title, body});
  }

  getArticles() {
    return this.afStore
      .collection('articles')
      .get()
      .pipe(
        map(querySnapshot => {
          const articles = [];
          querySnapshot.docs.forEach(doc => {
            articles.push({ id: doc.id, ...doc.data() });
          });
          return articles;
        })
      );
  }

  getArticlesByUserId(id: number) {
    // return this.afStore.collection('articles').get().pipe(
    return this.afStore
      .collection('articles', ref => ref.where('user.uid', '==', id))
      .get()
      .pipe(
        map(querySnapshot => {
          const articles = [];
          querySnapshot.docs.forEach(doc => {
            articles.push({ id: doc.id, ...doc.data() });
          });
          return articles;
        })
      );
    // db.collection("cities").where("capital", "==", true)
  }

  getQuery() {
    return this.afStore.collection('articles').get()
    .pipe(
      map(querySnapshot => {
        const allTopics = [];
        const allTags = [];
        querySnapshot.docs.map(doc => {
          if (!allTopics.includes(doc.data().topic)) {
            allTopics.push(doc.data().topic);
          }
          doc.data().tags.map(tag => {
            if (allTags.indexOf(tag) === -1) {
              allTags.push(tag);
            }
          });
        });
        // console.log(allTags);
        // console.log(allTopics);
        return {
          allTags,
          allTopics
        };
      })
    );
  }

  getArticlesWithQuery(params: string) {
    return of(5);
  }

  getArticle(articleId: string) {
    return from(
      this.afStore
        .collection('articles')
        .doc(articleId)
        .get()
    ).pipe(
      map(doc => {
        return { id: doc.id, ...doc.data() };
      })
    );
  }

  deleteArticle(id: string) {
    return this.afStore
      .collection('articles')
      .doc(id)
      .delete();
  }
}
