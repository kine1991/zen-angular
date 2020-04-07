import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as ArticleActions from './article.actions';
import { switchMap, tap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ArticleResponseData } from './article.actions';

@Injectable()
export class ArticleEffects {
  @Effect()
  fetchArticles = this.actions$.pipe(
    ofType(ArticleActions.FETCH_ARTICLES_START),
    switchMap(() => {
      return  this.afStore.collection('articles').get().pipe(
        map(querySnapshot => {
          const articles = [];
          querySnapshot.docs.forEach(doc => {
            articles.push({ id: doc.id, ...doc.data() });
          });
          return articles;
        }),
        map(articles => {
          return new ArticleActions.FetchArticlesSuccess(articles);
        })
      );
    })
  );

  @Effect()
  fetchArticlesByUserId = this.actions$.pipe(
    ofType(ArticleActions.FETCH_ARTICLES_BY_USER_ID_START),
    switchMap((fetchArticlesByUserId: ArticleActions.FetchArticleByUserIdStart) => {
      return  this.afStore.collection('articles', ref => ref.where('user.uid', '==', fetchArticlesByUserId.id)).get().pipe(
        map(querySnapshot => {
          const articles = [];
          querySnapshot.docs.forEach(doc => {
            articles.push({ id: doc.id, ...doc.data() });
          });
          return articles;
        }),
        map(articles => {
          return new ArticleActions.FetchArticlesSuccess(articles);
        })
      );
    })
  );

  // return this.afStore
  // .collection('articles', ref => ref.where('user.uid', '==', id))
  // .get()
  // .pipe(
  //   map(querySnapshot => {
  //     const articles = [];
  //     querySnapshot.docs.forEach(doc => {
  //       articles.push({ id: doc.id, ...doc.data() });
  //     });
  //     return articles;
  //   })
  // );

  @Effect()
  fetchArticle = this.actions$.pipe(
    ofType(ArticleActions.FETCH_ARTICLE_START),
    switchMap((fetchArticleStart: ArticleActions.FetchArticleStart) => {
      return this.afStore.collection('articles')
        .doc(fetchArticleStart.payload)
        .get()
        .pipe(
          map(doc => {
            return { id: doc.id, ...doc.data() };
          }),
          map((article: ArticleResponseData) => {
            // console.log('article2', article);
            return new ArticleActions.FetchArticleSuccess(article);
          })
        );
    })
  );

  // return from(
    // this.afStore
    //   .collection('articles')
    //   .doc(articleId)
    //   .get()
  // ).pipe(
  //   map(doc => {
  //     return { id: doc.id, ...doc.data() };
  //   })
  // );

  constructor(
    private afStore: AngularFirestore,
    private actions$: Actions,
  ) {}
}
