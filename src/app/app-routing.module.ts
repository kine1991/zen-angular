import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ArticlesComponent } from './article/articles/articles.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import { ArticleComponent } from './article/article/article.component';
import { UsersComponent } from './user/users/users.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'create-article', component: CreateArticleComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/:articleId', component: ArticleComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:userId', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
