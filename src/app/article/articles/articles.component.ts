import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

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
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.articleService.getArticles()
    .subscribe(data => {
      // console.log(data)
      this.articles = data
    })
  }

  ChangeText(){
    console.log('ChangeText()')
  }
}
