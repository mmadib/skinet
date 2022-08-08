import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/model/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  title = 'Skinet';
  products: IProduct[];

  ngOnInit(): void {}
}
