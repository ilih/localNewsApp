import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  newsForm: FormGroup;
  errorMessage = '';
  itemsRef: AngularFireList<News>;
  user: User;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private state: DataStateService) {

    this.newsForm = fb.group({
      title: ['', Validators.minLength(3)],
      description: ['', Validators.minLength(3)]
    });

    this.itemsRef = db.list('news-list');
    this.user = this.state.user;
  }

  onSubmit() {
    const val = this.newsForm.value;

    if (val.title && val.description ) {
      val.ownerId = this.user.id;
      val.location = this.user.location;
      val.date = Date.now();
      val.point = 0;

      this.itemsRef.push(val).then(() => {
        this.newsForm.reset();
        this.errorMessage = '';
        this.router.navigateByUrl('app/profile');
      });
    } else {
      this.errorMessage = 'Pls fill correct the form';
    }
  }
}
