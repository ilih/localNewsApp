import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from "firebase/app";
import { VoitService } from './voit.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface User {
  name: string;
  email: string;
  id: string;
  location: object;
}

@Injectable()
export class AuthService {
  user: User;
  activeUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private voit: VoitService
  ) { }

  get isLogin() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.activeUser$.next(false);
    this.router.navigateByUrl('login');
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((data) => {
      console.log(data.user);
      localStorage.setItem('token', data.credential.accessToken);
      this.user = {
        name: data.user.displayName,
        email: data.user.email,
        id: data.user.uid,
        location: this.getLocationFromBrowser()
      };

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

      // console.log(this.user$);

      this.activeUser$.next(true);
      this.router.navigateByUrl('feed');
    });
  }

  checkLocationPermissions() {
    navigator.permissions.query({name:'geolocation'}).then((result) => {
      if (result.state == 'granted') {
        this.getLocationFromBrowser();
        report(result.state);
      } else if (result.state == 'prompt') {
        report(result.state);
      } else if (result.state == 'denied') {
        this.router.navigateByUrl('/location');
        report(result.state);
      }
    });

    function report(state) {
      console.log('Permission ' + state);
    }
  }

  getLocationFromBrowser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        return (position.coords)?JSON.stringify(position.coords):this.checkLocationPermissions();
      });
    } else {
      console.log('Browser dont support navigator');
    }
    return {}
  }
}
