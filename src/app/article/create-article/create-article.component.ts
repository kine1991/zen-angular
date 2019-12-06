import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  form: FormGroup
  userData;

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(''),
    });

    this.authService.userData$.subscribe(userData => {
      // console.log(userData)
      this.userData = userData;
    })
  }

  createArticle(){
    const {title, body} = this.form.value;
    // console.log(title, body, this.userData.uid)
    this.articleService.createArticle(title, body, this.userData.uid)
    .subscribe(articleData => {
      this.form.reset();
      this.router.navigate(['articles'])
      // console.log('articleData', articleData)
    })
  }
}
