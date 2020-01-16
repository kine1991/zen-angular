import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article/article.service';


@Component({
  selector: 'app-filter-articles',
  templateUrl: './filter-articles.component.html',
  styleUrls: ['./filter-articles.component.scss']
})
export class FilterArticlesComponent implements OnInit {
  public filterObj;
  public selectedFilterObj = {
    tag: null,
    topic: null,
    sortBy: null
  };

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.articleService.getQuery().subscribe(res => {
      this.filterObj = res;
    });
  }

  resetFilter() {
    this.selectedFilterObj = {
      tag: null,
      topic: null,
      sortBy: null
    };
    this.articleService.onChangeFilter$.next(this.selectedFilterObj);
    // console.log('filterObj', this.filterObj);
  }

  onChangeTopicSelected(value) {
    this.selectedFilterObj.topic = value;
    this.articleService.onChangeFilter$.next(this.selectedFilterObj);
  }

  onChangeTagSelected(value) {
    this.selectedFilterObj.tag = value;
    this.articleService.onChangeFilter$.next(this.selectedFilterObj);
  }

  onChangeSortSelected(value) {
    this.selectedFilterObj.sortBy = value;
    this.articleService.onChangeFilter$.next(this.selectedFilterObj);
  }
}
