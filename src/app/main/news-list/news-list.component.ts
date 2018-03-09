import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { News } from '../../model/news';
import { DataStateService } from '../../services/data-state.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  itemsRef: AngularFireList<News>;
  newsList: News[];

  constructor(
    private db: AngularFireDatabase,
    private state: DataStateService
  ) {
    this.itemsRef = db.list('/news-list', ref => ref
      .orderByChild('ownerId')
      .equalTo(this.state.user.id)
      .limitToLast(6));
  }

  ngOnInit() {
    this.itemsRef.snapshotChanges().map(data => {
      const newList = [];
      if (data.length) {
        data.forEach((item, i) => {
          newList[i] = item.payload.val();
          newList[i].key = item.key;
        });
      }
      return newList;
    }).subscribe(data => {
      this.newsList = data;
    });
  }
}
