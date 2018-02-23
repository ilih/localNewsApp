import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppGuard } from './app.guard';
import { ProfileComponent } from './main-page/profile/profile.component';
import { NewsAddComponent } from './main-page/news-add/news-add.component';
import { FeedComponent } from './main-page/feed/feed.component';
import { LocationComponent } from './main-page/location/location.component';


const routes: Routes = [
  {
    path: 'location',
    component: LocationComponent,
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
