import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginFormComponent } from './login-form/login-form.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewsDetailComponent } from './main-page/news-detail/news-detail.component';
import { NewsListComponent } from './main-page/news-list/news-list.component';
import { NewsAddComponent } from './main-page/news-add/news-add.component';
import { FeedComponent } from './main-page/feed/feed.component';
import { ProfileComponent } from './main-page/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HeaderComponent,
    MainPageComponent,
    NotFoundComponent,
    NewsDetailComponent,
    NewsListComponent,
    NewsAddComponent,
    FeedComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
