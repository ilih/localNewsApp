import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppGuard } from './app.guard';
import { ProfileComponent } from './main/profile/profile.component';
import { NewsAddComponent } from './main/news-add/news-add.component';
import { FeedComponent } from './main/feed/feed.component';
import { LocationComponent } from './main/location/location.component';
import { MainComponent } from './main/main.component';
import {NewsListComponent} from './main/news-list/news-list.component';
import {NewsDetailComponent} from './main/news-detail/news-detail.component';


const routes: Routes = [
  {
    path: 'app',
    component: MainComponent,
    canActivate: [AppGuard],
    children: [
      {
        path: 'location',
        component: LocationComponent
      },
      {
        path: 'feed',
        component: FeedComponent,
        children: [
          {
            path: '',
            component: NewsListComponent
          },
          {
            path: ':id',
            component: NewsDetailComponent
          }
        ]
      },
      {
        path: 'add',
        component: NewsAddComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: NewsListComponent
          },
          {
            path: ':id',
            component: NewsDetailComponent
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
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
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
