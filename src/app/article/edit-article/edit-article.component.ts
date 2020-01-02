import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { ArticleService } from '../article.service';
import { switchMap, tap } from 'rxjs/operators';

interface Article {
  id: any;
  body: any;
  date: any;
  title: any;
  user: any;
}

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public userData;
  public articleData;
  public authSub: Subscription;

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(userData => {
      this.userData = userData;
    });

    this.form = new FormGroup({
      title: new FormControl(''),
      body: new FormControl('')
    });

    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          return this.articleService.getArticle(params.params.articleId);
        })
      )
      .subscribe((articleData: Article) => {
        this.articleData = articleData;
        this.form.setValue({
          title: articleData.title,
          body: articleData.body
        });
      });
  }

  updateArticle() {
    const { title, body } = this.form.value;
    this.articleService.updateArticle(title, body, this.articleData.id)
    .then(() => {
      this.form.reset();
      this.router.navigate(['articles']);
    })
    .catch(err => console.log(err));
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
