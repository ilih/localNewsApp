import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {News} from '../../model/news';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  newsForm: FormGroup;
  errorMessage = '';
  @Input() item: News;
  @Output() inputsVal = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.newsForm = fb.group({
      title: ['', Validators.minLength(3)],
      description: ['', Validators.minLength(3)]
    });
  }

  ngOnInit() {
    if (this.item) {
      this.newsForm.setValue({
        title: this.item.title,
        description: this.item.description
      });
    }
  }

  onSubmit() {
    const val = this.newsForm.value;
    if (val.title && val.description ) {
      this.inputsVal.emit(val);
      this.newsForm.reset();
    } else {
      this.errorMessage = 'Pls fill correct the form';
    }
  }
}
