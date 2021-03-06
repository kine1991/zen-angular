import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SeedService } from 'src/app/shared/seed.service';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  form: FormGroup;
  userData;
  authSub: Subscription;
  // user$;

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private seedService: SeedService,
  ) { }

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(userData => {
      // console.log('userData', userData)
      this.userData = userData;
    });

    this.form = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(''),
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  createArticle() {
    const { title, body } = this.form.value;
    if (!this.userData.uid) {
      alert('You are not logged');
    }
    this.articleService.createArticle(title, body, this.userData)
      .subscribe(articleData => {
        this.form.reset();
        this.router.navigate(['articles']);
      });
  }


  createFakeData() {
    this.seedService.createFakeData(5, 15); // параметры: максимальное рандомное количество пользователей и статей у каждого из них
  }
}
