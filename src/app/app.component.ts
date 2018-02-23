import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'local news';
  activeUser: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    // this.activeUser = false;
    this.auth.activeUser$.subscribe((data) => {
      console.log('subject', data);
      this.activeUser = data;
    });
  }
}


