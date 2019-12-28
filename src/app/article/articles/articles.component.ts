import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {MatDialog, /*MatDialogRef, MAT_DIALOG_DATA */} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component'
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  articles;
  panelOpenState = false;
  search_field;
  getArticlesSub: Subscription;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getArticlesSub = this.articleService.getArticles()
    .subscribe(data => {
      this.articles = data;
    })

    this.route.queryParamMap.pipe(
      switchMap(params => {
        return this.articleService.getArticlesWithQuery(params.get('search'));
      })
    )
    .subscribe(res => {
      // console.log('res', res)
    })
  }

  ngOnDestroy(){
    this.getArticlesSub.unsubscribe();
  }

  ChangeText(){
    // console.log('ChangeText()')
  }

  search(){
    // console.log('search', this.search_field)
  }


  openDialog(){
    let dialogRef = this.dialog.open(DialogComponent, {data: {name: 'Nikolay'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`res: ${result}`)
    })
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