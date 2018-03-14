import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorage} from 'angularfire2/storage';
import {Subject} from 'rxjs/Subject';
import {Image} from '../model/image';
import 'rxjs/add/operator/take';

@Injectable()
export class UploadService {
  imageObj$ = new Subject<Image>();

  uploadPercent: Observable<number>;
  refName: string;

  constructor(private storage: AngularFireStorage) { }


  save(image) {
    this.refName = 'news/' + Date.now() + '_' + image['name'];
    const task = this.storage.upload(this.refName, image);
    this.uploadPercent = task.percentageChanges();
    task.downloadURL().take(1).subscribe(data => {
      this.imageObj$.next({
        url: data,
        name: image['name'],
        ref: this.refName
      });
    });
  }

  delete(ref) {
    this.storage.storage.ref().child(ref).delete();
  }

  update(image, ref) {
    this.delete(ref);
    this.save(image);
  }
}
