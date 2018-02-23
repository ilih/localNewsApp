import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginFormComponent } from './login-form/login-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewsDetailComponent } from './main-page/news-detail/news-detail.component';
import { NewsListComponent } from './main-page/news-list/news-list.component';
import { NewsAddComponent } from './main-page/news-add/news-add.component';
import { FeedComponent } from './main-page/feed/feed.component';
import { ProfileComponent } from './main-page/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppGuard } from './app.guard';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { LocationComponent } from './main-page/location/location.component';
import { NavComponent } from './main-page/nav/nav.component';
import { NewsService } from './services/news.service';
import { VoitService } from './services/voit.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NotFoundComponent,
    NewsDetailComponent,
    NewsListComponent,
    NewsAddComponent,
    FeedComponent,
    ProfileComponent,
    LocationComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AppGuard,
    AuthService,
    NewsService,
    VoitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
