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
import { QuillModule } from 'ngx-quill';
import { HeaderComponent } from './navigation/header/header.component';
import { CreateArticleComponent } from './article/create-article/create-article.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ArticlesComponent,
    HeaderComponent,
    CreateArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
