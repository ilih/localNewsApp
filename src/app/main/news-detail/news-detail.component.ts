import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../model/news';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {DataStateService} from '../../services/data-state.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from 'angularfire2/storage';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  itemsRef: AngularFireList<News>;
  item: News;
  userId: string;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  refName: string;

  constructor(
    private db: AngularFireDatabase,
    private state: DataStateService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage
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

    this.saveImage();
    this.downloadURL.take(1).subscribe(data => {
      this.item.upload = {
        url: data,
        name: e.upload['name'],
        ref: this.refName
      };
    });
    this.itemsRef.set(key, this.item);
  }

  delete(key) {
    this.router.navigateByUrl('app/profile');
    this.itemsRef.remove(key);
    this.deleteImage();
  }

  deleteImage() {
    this.storage.storage.ref().child(this.item.upload.ref).delete();
  }

  updateImage() {

  }

  saveImage() {
    this.refName = 'news/' + Date.now() + '_' + this.selectedFiles['name'];
    const task = this.storage.upload(this.refName, this.selectedFiles);
    this.uploadPercent = task.percentageChanges();
    this.downloadURL = task.downloadURL();
  }

  like(count, key) {
    let item = -1;

    if (!this.item.likeUsers) {
      this.item.likeUsers = [];
    } else {
      for (let i = 0; i < this.item.likeUsers.length; i++) {
        if (this.item.likeUsers[i].user === this.item.ownerId) {
          item = i;
          break;
        }
      }
    }

    if (item >= 0) {
      const userStatus = this.item.likeUsers[item].status;

      if (userStatus !== count) {
        switch (count) {
          case -1:
            if (userStatus === 0) {
              this.item.point -= 1;
            } else if (userStatus === 1) {
              this.item.point -= 2;
            }
            break;
          case 0:
            if (userStatus === -1) {
              this.item.point += 1;
            } else if (userStatus === 1) {
              this.item.point -= 1;
            }
            break;
          case 1:
            if (userStatus === 0) {
              this.item.point += 1;
            } else if (userStatus === -1) {
              this.item.point += 2;
            }
            break;
        }

        this.item.likeUsers[item].status = count;
      }
    } else {
      this.item.point += count;
      this.item.likeUsers.push({user: this.item.ownerId, status: count});
    }

    this.itemsRef.set(key, this.item);
    this.router.navigateByUrl('app/feed');
  }
}
