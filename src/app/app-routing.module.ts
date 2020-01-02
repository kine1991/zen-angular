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
import { AuthGuard } from './shared/guards/auth.guard';
import { UnauthGuard } from './shared/guards/unauth.guard';
import { EditArticleComponent } from './article/edit-article/edit-article.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sign-in', component: SignInComponent, canActivate: [UnauthGuard]},
  {path: 'sign-up', component: SignUpComponent, canActivate: [UnauthGuard]},
  {path: 'create-article', component: CreateArticleComponent, canActivate: [AuthGuard]},
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/:articleId', component: ArticleComponent},
  // {path: 'articles/:articleId/edit', component: EditArticleComponent},
  {path: 'articles/:articleId/edit', component: EditArticleComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent},
  {path: 'users/:userId', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
