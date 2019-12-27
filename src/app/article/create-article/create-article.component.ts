import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SeedService } from 'src/app/shared/seed.service';



@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  form: FormGroup
  userData;
  // user$;

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private seedService: SeedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(userData => {
      // console.log('userData', userData)
      this.userData = userData
    })

    this.form = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(''),
    });

  }

  createArticle(){
    const {title, body} = this.form.value;
    if(!this.userData.uid){
      alert('You are not logged')
    }
    this.articleService.createArticle(title, body, this.userData)
    .subscribe(articleData => {
      this.form.reset();
      this.router.navigate(['articles'])
    })
  }


  createFakeData() {
    this.seedService.createFakeData(5, 15) // параметры: максимальное рандомное количество пользователей и статей у каждого из них
  }
}
