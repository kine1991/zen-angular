import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {
  MatDialog /*MatDialogRef, MAT_DIALOG_DATA */
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public articles;
  public currentUid;
  public panelOpenState = false;
  public searchField;
  public getArticlesSub: Subscription;
  public onChangeFilterSub: Subscription;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getArticlesSub = this.articleService.getArticles().subscribe(data => {
      // console.log('data', data);
      this.articles = data;
    });

    this.onChangeFilterSub = this.articleService.onChangeFilter$.subscribe(filter => {
      console.log('filter2');
      console.log(filter);
      this.articleService.getArticles(filter)
      .subscribe(data => {
        // this.articles = data;
        this.articles = data;
      });
    });

    this.authService.user$.subscribe(userData => {
      this.currentUid = userData.uid;
    });

    // this.route.queryParamMap
    //   .pipe(
    //     switchMap(params => {
    //       return this.articleService.getArticlesWithQuery(params.get('search'));
    //     })
    //   )
    //   .subscribe(res => {
    //     // console.log('res', res)
    //   });
  }

  ngOnDestroy() {
    this.getArticlesSub.unsubscribe();
    this.onChangeFilterSub.unsubscribe();
  }

  // ChangeText() {
  //   // console.log('ChangeText()')
  // }

  // search() {
  //   // console.log('search', this.searchField)
  // }

  delete(uidEl, idEl) {
    if (this.currentUid === uidEl) {
      const isDelete = confirm('you are sure?');
      if (isDelete) {
        this.articleService
          .deleteArticle(idEl)
          .then(() => {
            this.articles = this.articles.filter(item => item.id !== idEl);
          })
          .catch(error => {
            console.error('Error removing document: ', error);
          });
      }
    }
  }

  edit(uidEl, idEl) {
    console.log(uidEl, idEl);
    if (this.currentUid === uidEl) {
      this.router.navigate(['articles', idEl, 'edit']);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: 'Nikolay' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`res: ${result}`);
    });
  }
}

// DialogComponent
// @Component({
//   selector: 'app-article',
//   templateUrl: './article.component.html',
//   styleUrls: ['./article.component.scss'],
//   // encapsulation: ViewEncapsulation.None,
// })

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// openDialog(): void {
//   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
//     width: '250px',
//     // data: {name: this.name, animal: this.animal}
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');
//     // this.animal = result;
//   });
// }

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
