import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ArticleService } from '../../article/article.service'
import { User } from '../user.model'
import { Subscription } from 'rxjs';
// import {Subject} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public user;
  public size;
  public articles;
  public userSub: Subscription

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.userService.getUserById(params.get('userId'))
      })
    )
    .subscribe((user) => {
      this.user = user;
    })

    this.userSub = this.userService.user$.subscribe((user: User)=> {
      // console.log('user')
      // console.log(user.id)
      this.articleService.getArticlesByUserId(user.id).subscribe(articles => {
        // console.log('articles')
        // console.log(articles)
        this.size = articles.length
        this.articles = articles
      })

    })
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }



}
