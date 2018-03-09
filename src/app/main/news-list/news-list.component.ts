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
  detail = false;

  constructor(
    private db: AngularFireDatabase,
    private state: DataStateService
  ) {
    this.itemsRef = db.list('/news-list', ref => ref
      .orderByChild('ownerId')
      .equalTo(this.state.user.id)
      .limitToLast(2));
  }

  ngOnInit() {
    this.itemsRef.valueChanges().subscribe(data => {
      this.itemsRef.snapshotChanges().subscribe(dataId => {
        data.map(function(item, i) {
          return item.key = dataId[i].key;
        });
        this.newsList = data;
        console.log(data);
      });
    });
  }

  showDetail(date) {
    console.log(date);
  }
}
