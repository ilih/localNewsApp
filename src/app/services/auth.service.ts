import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import {DataStateService} from './data-state.service';

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private state: DataStateService
  ) { }

  get isLogin() {
    return !!localStorage.getItem('user');
  }

  logout() {
    this.state.setUserState(false);
    this.router.navigateByUrl('login');
    localStorage.removeItem('user');
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((data) => {
      const user = JSON.stringify({
        name: data.user.displayName,
        email: data.user.email,
        id: data.user.uid,
        token: data.credential.accessToken,
        location: JSON.stringify(this.getLocationFromBrowser())
      });
      localStorage.setItem('user', user);
      this.state.setUserState(true);

      this.checkLocationPermissions();

      // this.voit.getVoitStatus(data.credential).subscribe(data => {
      //   console.log(data)
      //   if (data.status) {
      //     this.router.navigateByUrl('feed');
      //   } else {
      //     console.log('open current article');
      //     this.router.navigateByUrl('feed');
      //   }
      // });

      this.router.navigateByUrl('app');
    });
  }

  checkLocationPermissions() {
    // navigator.permissions.query({name:'geolocation'}).then((result) => {
    //   if (result.state == 'granted') {
    //     this.getLocationFromBrowser();
    //     report(result.state);
    //   } else if (result.state == 'prompt') {
    //     report(result.state);
    //   } else if (result.state == 'denied') {
    //     this.router.navigateByUrl('/location');
    //     report(result.state);
    //   }
    // });
    //
    // function report(state) {
    //   console.log('Permission ' + state);
    // }
  }

  getLocationFromBrowser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        return (position.coords) ? position.coords : this.checkLocationPermissions();
      });
    } else {
      console.log('Browser dont support navigator');
    }
    return {};
  }
}
