import {Component} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { News } from '../../model/news';
import { DataStateService } from '../../services/data-state.service';
import { User } from '../../model/user';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss'],
  providers: [UploadService]
})
export class NewsAddComponent {
  itemsRef: AngularFireList<News>;
  user: User;
  // newsItem: News;
  uploadPercent: number;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private state: DataStateService,
    private uploadSrv: UploadService) {

    this.itemsRef = db.list('news-list');
    this.user = this.state.user;
  }

  addNews(e) {
    this.uploadSrv.save(e.image);
    this.uploadSrv.uploadPercent.subscribe(data => this.uploadPercent = data);
    this.uploadSrv.imageObj$.subscribe(data => {
      this.itemsRef.push({
        title: e.title,
        description: e.description,
        ownerId: this.user.id,
        location: this.user.location,
        date: Date.now(),
        point: 0,
        upload: data
      }).then(() => {
        this.router.navigateByUrl('app/profile');
      });
    });
  }
}
