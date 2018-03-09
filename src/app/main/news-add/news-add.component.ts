import {Component} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { News } from '../../model/news';
import { DataStateService } from '../../services/data-state.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent {
  itemsRef: AngularFireList<News>;
  user: User;
  newsItem: News;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private state: DataStateService) {

    this.itemsRef = db.list('news-list');
    this.user = this.state.user;
  }

  addNews(e) {
    this.newsItem = {
      title: e.title,
      description: e.description,
      ownerId: this.user.id,
      location: this.user.location,
      date: Date.now(),
      point: 0
    };

    this.itemsRef.push(this.newsItem).then(() => {
      this.router.navigateByUrl('app/profile');
    });
  }
}
