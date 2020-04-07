import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ArticleService } from '../../article/article.service';
import { User } from '../user.model';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {first} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as UserAction from '../store/user.actions';
import * as ArticleAction from '../../article/store/article.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public user;
  public user$ = new Subject();
  public loading;
  public currentUid;
  public size;
  public articles;
  public userSub: Subscription;
  public articlesSub: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.store.dispatch(new UserAction.FetchUserStart(userId));

    this.userSub = this.store.select('user').subscribe(user => {
      this.user = user.user;
      this.loading = user.loading;
      this.user$.next(user.user);
    });

    this.user$.subscribe((user: any) => {
      this.store.dispatch(new ArticleAction.FetchArticleByUserIdStart(user.id));
    });

    this.articlesSub = this.store.select('article').subscribe(article => {
      this.articles = article.articles;
      this.loading = article.loading;
      this.size = article.articles.length;
    });


    // this.authService.user$.pipe(first()).subscribe(userData => {
    //   this.currentUid = userData.uid;
    // });
    // this.route.paramMap
    //   .pipe(
    //     switchMap((params: Params) => {
    //       return this.userService.getUserById(params.get('userId'));
    //     })
    //   )
    //   .subscribe(user => {
    //     this.user = user;
    //   });

    // this.userSub = this.userService.user$.subscribe((user: User) => {
    //   this.articleService.getArticlesByUserId(user.id).subscribe(articles => {
    //     this.size = articles.length;
    //     this.articles = articles;
    //   });
    // });
  }

  delete(uidEl, idEl) {
    if (this.currentUid === uidEl) {
      const isDelete = confirm('you are sure?');
      if (isDelete) {
        this.articleService
          .deleteArticle(idEl)
          .then(() => {
            this.articles = this.articles.filter(item => item.id !== idEl);
            // console.log('Document successfully deleted!');
          })
          .catch(error => {
            console.error('Error removing document: ', error);
          });
      }
    }
  }

  edit(uidEl, idEl) {
    if (this.currentUid === uidEl) {
      this.router.navigate(['articles', idEl, 'edit']);
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.articlesSub.unsubscribe();
  }
}
