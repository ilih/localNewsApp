import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../model/news';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {DataStateService} from '../../services/data-state.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  itemsRef: AngularFireList<News>;
  item: News;
  userId: string;

  constructor(
    private db: AngularFireDatabase,
    private state: DataStateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = this.state.user.id;
    const id = this.route.snapshot.paramMap.get('id');
    this.itemsRef = db.list('/news-list', ref => ref.orderByKey().equalTo(id));
  }

  ngOnInit() {
    this.itemsRef.snapshotChanges().map(data => {
      if (data.length) {
        const news = data[0].payload.val();
        news.key = data[0].key;
        return news;
      } else {
        return data;
      }
    }).subscribe(data => {
      this.item = data;
    });
  }

  update(e, key) {
    this.item.title = e.title;
    this.item.description = e.description;
    this.itemsRef.set(key, this.item);
  }

  delete(key) {
    this.itemsRef.remove(key);
    this.router.navigateByUrl('app/profile');
  }
}
