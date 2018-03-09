import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../model/user';

@Injectable()
export class DataStateService {
  userState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: User;

  constructor() { }

  setUserState(val) {
    this.userState$.next(val);
  }

  setUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
