import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit, OnDestroy {
  article
  date = Date.now()

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }




  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.articleService.getArticle(params.params.articleId)
      })
    )
    .subscribe((data) => {
      // console.log(data)
      this.article = data
    })
  }

  ngOnDestroy(){
    // console.log('unsubscribe')
  }

}


