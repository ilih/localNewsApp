import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../model/news';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  @Input() item: News;

  constructor() { }

  ngOnInit() {
  }

}
