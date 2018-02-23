import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { News } from '../../model/news';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {
  newsForm: FormGroup;
  errorMessage = '';
  itemsRef: AngularFireList<News>;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private auth: AuthService) {

    this.newsForm = fb.group({
      title: ['', Validators.minLength(3)],
      description: ['', Validators.minLength(3)]
    });

    this.itemsRef = db.list('news-list');
  }

  ngOnInit() {
  }

  onSubmit() {
    const val = this.newsForm.value;
    if (val.title && val.description ) {
      val.ownerId = this.auth.user.id;
      val.location = this.auth.user.location;
      val.date = Date.now();

      console.log(val);


      this.itemsRef.push(val).then(() => {
        this.newsForm.reset();
        // this.router.navigateByUrl('feed');
      });
    }
  }

}
