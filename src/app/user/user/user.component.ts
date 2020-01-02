import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ArticleService } from '../../article/article.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public user;
  public currentUid;
  public size;
  public articles;
  public userSub: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.pipe(first()).subscribe(userData => {
      this.currentUid = userData.uid;
    });
    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          return this.userService.getUserById(params.get('userId'));
        })
      )
      .subscribe(user => {
        this.user = user;
      });

    this.userSub = this.userService.user$.subscribe((user: User) => {
      // console.log('user')
      // console.log(user.id)
      this.articleService.getArticlesByUserId(user.id).subscribe(articles => {
        // console.log('articles')
        // console.log(articles)
        this.size = articles.length;
        this.articles = articles;
      });
    });
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
  }
}
