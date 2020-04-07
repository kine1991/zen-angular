import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home/home.component';
import { ArticlesComponent } from './article/articles/articles.component';
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './angular-material.module';
// import { QuillModule } from 'ngx-quill';
import { HeaderComponent } from './navigation/header/header.component';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import { HtmlToPlainTextDirective } from './article/directives/html-to-plain-text.directive';
import { TransformHtmlPipe } from './article/pipes/transform-html.pipe';
import { ArticleComponent } from './article/article/article.component';
import { DialogComponent } from './article/dialog/dialog.component';
import { UserComponent } from './user/user/user.component';
import { UsersComponent } from './user/users/users.component';
import { EditArticleComponent } from './article/edit-article/edit-article.component';
import { FilterArticlesComponent } from './filter-articles/filter-articles.component';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ArticleEffects } from './article/store/article.effects';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ArticlesComponent,
    HeaderComponent,
    CreateArticleComponent,
    HtmlToPlainTextDirective,
    TransformHtmlPipe,
    ArticleComponent,
    DialogComponent,
    UserComponent,
    UsersComponent,
    EditArticleComponent,
    FilterArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularMaterialModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([ArticleEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {}
