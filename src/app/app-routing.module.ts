import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppGuard } from './app.guard';
import { ProfileComponent } from './main-page/profile/profile.component';
import { NewsAddComponent } from './main-page/news-add/news-add.component';
import { FeedComponent } from './main-page/feed/feed.component';
import { NewsDetailComponent } from './main-page/news-detail/news-detail.component';


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AppGuard]
  },{
    path: 'detail',
    component: NewsDetailComponent,
    canActivate: [AppGuard]
  },{
    path: 'feed',
    component: FeedComponent,
    canActivate: [AppGuard]
  },{
    path: 'add',
    component: NewsAddComponent,
    canActivate: [AppGuard]
  },{
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'not_found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not_found'
  }
];

@NgModule({
  imports: [
    // CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
