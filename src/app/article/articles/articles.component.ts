import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles;
  panelOpenState = false;
  search_field

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.articleService.getArticles()
    .subscribe(data => {
      // console.log('data', data)
      this.articles = data
    })

    this.route.queryParamMap.pipe(
      switchMap(params => {
        console.log(params.get('search'))
        return this.articleService.getArticlesWithQuery(params.get('search'));
      })
    )
    .subscribe(res => console.log('aaa', res))

  }

  ChangeText(){
    console.log('ChangeText()')
  }

  search(){
    console.log('search', this.search_field)
  }
}
