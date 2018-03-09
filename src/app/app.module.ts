import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginFormComponent } from './login-form/login-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewsDetailComponent } from './main/news-detail/news-detail.component';
import { NewsListComponent } from './main/news-list/news-list.component';
import { NewsAddComponent } from './main/news-add/news-add.component';
import { FeedComponent } from './main/feed/feed.component';
import { ProfileComponent } from './main/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppGuard } from './app.guard';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { LocationComponent } from './main/location/location.component';
import { NavComponent } from './main/nav/nav.component';
import { VoitService } from './services/voit.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DataStateService } from './services/data-state.service';
import { MainComponent } from './main/main.component';


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
    NavComponent,
    MainComponent
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
    VoitService,
    DataStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
