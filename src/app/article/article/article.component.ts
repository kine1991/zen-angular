import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
// import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as articleActions from '../store/article.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit, OnDestroy {
  public stateSize = 'less';
  public article;
  public loading;
  public date = Date.now();
  public getArticleSub: Subscription;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public store: Store<fromApp.AppState>
  ) { }




  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap((params: Params) => {
    //     return this.articleService.getArticle(params.params.articleId);
    //   })
    // )
    // .subscribe((data) => {
    //   // console.log(data)
    //   this.article = data;
    // });

    this.route.paramMap.subscribe((params: Params) => {
      this.store.dispatch(new articleActions.FetchArticleStart(params.params.articleId));
    });

    this.getArticleSub = this.store.select('article').subscribe(article => {
      this.article = article.article;
      this.loading = article.loading;
    });
  }

  ngOnDestroy() {
    this.getArticleSub.unsubscribe();
  }

  toggleSize() {
    if (this.stateSize === 'less') {
      this.stateSize = 'more';
    } else {
      this.stateSize = 'less';
    }
  }

}


