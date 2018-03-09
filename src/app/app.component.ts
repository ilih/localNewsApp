import { Component, OnInit } from '@angular/core';
import { DataStateService } from './services/data-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'local news';

  constructor(public state: DataStateService) { }

  ngOnInit() {
    this.state.setUser();
  }
}


